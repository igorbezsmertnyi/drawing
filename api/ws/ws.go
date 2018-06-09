package ws

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"

	"github.com/gorilla/websocket"
)

// connection is an middleman between the websocket connection and the hub.
type Connection struct {
	// The websocket connection.
	conn *websocket.Conn

	// Buffered channel of outbound messages.
	send chan []byte
}

func checkOrigin(r *http.Request) bool {
	return true
}

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 1024 * 1024
)

var Upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     checkOrigin,
}

// Handler handles websocket requests from the peer.
func Handler(w http.ResponseWriter, r *http.Request) {
	conn, err := Upgrader.Upgrade(w, r, nil)
	slug := mux.Vars(r)["slug"]

	if err != nil {
		log.Fatal("error: %s", err.Error())
		return
	}

	c := &Connection{
		send: make(chan []byte, 256),
		conn: conn,
	}

	s := Subscription{
		c,
		slug,
	}

	H.register <- s

	go s.writePump()
	s.readPump()
}

// readPump pumps messages from the websocket connection to the hub.
func (s Subscription) readPump() {
	c := s.conn

	defer func() {
		H.unregister <- s
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, msg, err := c.conn.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Fatal("error: %s", err.Error())
			}
			break
		}

		m := Message{msg, s.artboard}
		H.broadcast <- m
	}
}

// writePump pumps messages from the hub to the websocket connection.
func (s *Subscription) writePump() {
	c := s.conn
	ticker := time.NewTicker(pingPeriod)

	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.write(websocket.CloseMessage, []byte{})
				return
			}

			if err := c.write(websocket.TextMessage, message); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

// write writes a message with the given message type and payload.
func (c *Connection) write(mt int, payload []byte) error {
	c.conn.SetWriteDeadline(time.Now().Add(writeWait))
	return c.conn.WriteMessage(mt, payload)
}

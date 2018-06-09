package ws

type Message struct {
	data     []byte
	artboard string
}

type Subscription struct {
	conn     *Connection
	artboard string
}

// Hub maintains the set of active connections and broadcasts messages to the
type Hub struct {
	artboards  map[string]map[*Connection]bool
	broadcast  chan Message
	register   chan Subscription
	unregister chan Subscription
}

type Artboards struct {
	List map[string]map[*Connection]bool
}

var H = Hub{
	broadcast:  make(chan Message),
	register:   make(chan Subscription),
	unregister: make(chan Subscription),
	artboards:  make(map[string]map[*Connection]bool),
}

func (h *Hub) Run() {
	for {
		select {
		case s := <-h.register:
			connections := h.artboards[s.artboard]

			if connections == nil {
				connections = make(map[*Connection]bool)
				h.artboards[s.artboard] = connections
			}

			h.artboards[s.artboard][s.conn] = true
		case s := <-h.unregister:
			connections := h.artboards[s.artboard]

			if connections != nil {
				if _, ok := connections[s.conn]; ok {
					delete(connections, s.conn)
					close(s.conn.send)

					if len(connections) == 0 {
						delete(h.artboards, s.artboard)
					}
				}
			}
		case m := <-h.broadcast:
			connections := h.artboards[m.artboard]

			for c := range connections {
				select {
				case c.send <- m.data:
				default:
					close(c.send)
					delete(connections, c)

					if len(connections) == 0 {
						delete(h.artboards, m.artboard)
					}
				}
			}
		}
	}
}

package api

import (
	"drawing/models"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type e map[string]string

func unmarshal(r *http.Request) (*models.Artboard, error) {
	defer r.Body.Close()

	var artborad models.Artboard

	bytes, err := ioutil.ReadAll(r.Body)

	if err != nil {
		return nil, err
	}

	if err = json.Unmarshal(bytes, &artborad); err != nil {
		return nil, err
	}

	return &artborad, nil
}

func response(r *http.Request, w http.ResponseWriter, status int, bytes []byte) {
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(status)

	if bytes != nil {
		bytes = append(bytes, '\n')
		w.Write(bytes)
	}

	log.Printf(
		"\"%s %s %s\" %d %d\n",
		r.Method, r.URL.Path, r.Proto, status, len(bytes),
	)
}

func errorResponse(r *http.Request, w http.ResponseWriter, err error) {
	bytes, _ := json.Marshal(e{"message": err.Error()})

	response(r, w, http.StatusInternalServerError, bytes)
}

func respond(r *http.Request, w http.ResponseWriter, status int, data interface{}) {
	if data != nil {
		bytes, err := json.Marshal(data)

		if err != nil {
			errorResponse(r, w, err)
			return
		}

		response(r, w, status, bytes)
	} else {
		response(r, w, status, nil)
	}
}

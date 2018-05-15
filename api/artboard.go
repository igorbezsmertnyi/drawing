package api

import (
	"database/sql"
	"drawing/models"
	"net/http"

	"github.com/gorilla/mux"
)

var db *sql.DB

// Handler for creating new artborad
func HandlerCreateArboard(w http.ResponseWriter, r *http.Request) {
	db := models.DB
	created, err := models.CreateArtboard(db)

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	respond(r, w, http.StatusOK, created)
}

// Handler for getting artborad
func HandlerGetArboard(w http.ResponseWriter, r *http.Request) {
	db := models.DB
	slug := mux.Vars(r)["slug"]

	artborad, err := models.SelectArtboard(db, slug)

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	respond(r, w, http.StatusOK, artborad)
}

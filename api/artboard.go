package api

import (
	"database/sql"
	"drawing/models"
	"drawing/services"
	"net/http"

	"github.com/gorilla/mux"
)

var db *sql.DB

//HandlerCreateArboard for creating new artborad
func HandlerCreateArboard(w http.ResponseWriter, r *http.Request) {
	db := models.DB
	created, err := models.CreateArtboard(db)

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	respond(r, w, http.StatusOK, created)
}

//HandlerGetArboard for getting artborad
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

//HandlerUpdateArboard for updating artborad
func HandlerUpdateArboard(w http.ResponseWriter, r *http.Request) {
	db := models.DB
	slug := mux.Vars(r)["slug"]
	image, handle, err := r.FormFile("image")

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	defer image.Close()

	res, err := services.Upload(slug, image, handle)

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	artborad, err := models.UpdateArtboard(db, slug, res)

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	respond(r, w, http.StatusOK, artborad)
}

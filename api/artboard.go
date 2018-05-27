package api

import (
	"database/sql"
	"drawing/models"
	"drawing/services"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

var db *sql.DB

type Image struct {
	Image string `json:"image"`
}

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
	i := Image{}
	slug := mux.Vars(r)["slug"]
	json.NewDecoder(r.Body).Decode(&i)
	res, err := services.Upload(slug, i.Image)

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	artborad, err := models.SelectArtboard(db, slug)

	if err != nil {
		errorResponse(r, w, err)
		return
	}

	if artborad.Image == "" {
		artborad, err = models.UpdateArtboard(db, slug, res)

		if err != nil {
			errorResponse(r, w, err)
			return
		}
	}

	respond(r, w, http.StatusOK, artborad)
}

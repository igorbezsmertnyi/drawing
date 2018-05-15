package routes

import (
	"net/http"

	"drawing/api"

	"github.com/gorilla/mux"
)

// NewRoutes builds the routes for the api
func NewRoutes() *mux.Router {
	mux := mux.NewRouter().StrictSlash(true)

	// client static files
	mux.Handle("/", http.FileServer(http.Dir("./dist/"))).Methods("GET")
	mux.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./dist/"))))

	// api requst path
	apiPath := mux.PathPrefix("/api/").Subrouter()

	apiPath.HandleFunc("/create_artboard", api.HandlerCreateArboard).Methods("POST")
	apiPath.HandleFunc("/get_artboard/{slug}", api.HandlerGetArboard).Methods("GET")

	return mux
}

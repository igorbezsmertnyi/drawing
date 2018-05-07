package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

// NewRoutes builds the routes for the api
func NewRoutes() *mux.Router {
	mux := mux.NewRouter().StrictSlash(true)

	// client static files
	mux.Handle("/", http.FileServer(http.Dir("./dist/"))).Methods("GET")
	mux.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./dist/"))))

	return mux
}

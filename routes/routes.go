package routes

import (
	"io/ioutil"
	"net/http"

	"drawing/api"
	"drawing/api/ws"

	"github.com/gorilla/mux"
)

//js router
func emptyHandler(w http.ResponseWriter, r *http.Request) {
	f, _ := ioutil.ReadFile("./dist/index.html")

	w.WriteHeader(http.StatusOK)
	w.Write(f)
}

// NewRoutes builds the routes for the api
func NewRoutes() *mux.Router {
	mux := mux.NewRouter().StrictSlash(true)

	// client static files
	mux.Handle("/", http.FileServer(http.Dir("./dist/"))).Methods("GET")
	mux.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./dist/"))))

	//js routes
	mux.HandleFunc("/artboard/{slug}", emptyHandler).Methods("GET")

	// api requst path
	apiPath := mux.PathPrefix("/api/").Subrouter()

	apiPath.HandleFunc("/artboard/create", api.HandlerCreateArboard).Methods("POST")
	apiPath.HandleFunc("/artboard/{slug}", api.HandlerGetArboard).Methods("GET")
	apiPath.HandleFunc("/artboard/{slug}", api.HandlerUpdateArboard).Methods("PATCH")
	apiPath.HandleFunc("/artboard/hub/{slug}", ws.Handler).Methods("GET")

	return mux
}

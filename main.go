package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"drawing/models"
	"drawing/routes"
	"drawing/services"
	"drawing/utils"

	"github.com/urfave/negroni"
)

func determineListenAddress() (string, error) {
	port := os.Getenv("PORT")
	if port == "" {
		return ":3000", fmt.Errorf("$PORT not set")
	}
	return ":" + port, nil
}

func connectDatabase() {
	db, err := models.Connect()

	if err != nil {
		log.Fatalf("Connection error: %s", err.Error())
	}

	models.SetDatabase(db)
}

func awsSession() {
	sess, err := services.AWSSession()

	if err != nil {
		log.Fatalf("Connection error: %s", err.Error())
	}

	services.AWS(sess)
}

func main() {
	connectDatabase()
	awsSession()

	addr, _ := determineListenAddress()
	routes := routes.NewRoutes()
	n := negroni.Classic()
	n.Use(utils.AllowCors())
	n.UseHandler(routes)

	s := &http.Server{
		Addr:           addr,
		Handler:        n,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Fatal(s.ListenAndServe())
}

package models

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func SetDatabase(db *sql.DB) {
	DB = db
}

//Connect function used for connect to databse
func Connect() (*sql.DB, error) {
	dbURL := os.Getenv("DATABASE_URL")

	if dbURL == "" {
		dbURL = "user=postgres dbname=postgres password=postgres sslmode=disable"
	}

	db, err := sql.Open("postgres", dbURL)

	if err != nil {
		log.Fatal("database error: %s", err.Error())
		return nil, err
	}

	err = db.Ping()

	if err != nil {
		log.Fatal("database error: %s", err.Error())
		return nil, err
	}

	_, err = db.Exec(`
    CREATE TABLE IF NOT EXISTS artboard (
      id       	 SERIAL,
			slug		 	 TEXT,
			image			 TEXT DEFAULT '',
      created_at TIMESTAMP
		);
		CREATE UNIQUE INDEX IF NOT EXISTS index_slug ON artboard (slug);
  `)

	if err != nil {
		return nil, err
	}

	return db, nil
}

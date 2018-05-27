package models

import (
	"database/sql"
	"drawing/utils"
	"log"
	"time"
)

//Artboard row structure
type Artboard struct {
	Id        int64     `json:"id"`
	Slug      string    `json:"slug"`
	Image     string    `json:"image"`
	CreatedAt time.Time `json:"created_at"`
}

//CreateArtboard Artboard Action
func CreateArtboard(db *sql.DB) (*Artboard, error) {
	artboard := Artboard{}
	slug := utils.RandStringBytes(4)
	createdAt := time.Now()

	row, _ := db.Query(
		"INSERT INTO artboard (slug, created_at) VALUES ($1, $2) RETURNING *;",
		slug,
		createdAt,
	)

	for row.Next() {
		if err := row.Scan(&artboard.Id, &artboard.Slug, &artboard.Image, &artboard.CreatedAt); err != nil {
			log.Fatal("sql error: %s", err.Error())
			return nil, err
		}
	}

	return &artboard, nil
}

//SelectArtboard Artboard Action
func SelectArtboard(db *sql.DB, slug string) (*Artboard, error) {
	artboard := Artboard{}

	row, _ := db.Query(
		"SELECT * FROM artboard WHERE slug LIKE $1;",
		slug,
	)

	for row.Next() {
		if err := row.Scan(&artboard.Id, &artboard.Slug, &artboard.Image, &artboard.CreatedAt); err != nil {
			log.Fatal("sql error: %s", err.Error())
			return nil, err
		}
	}

	return &artboard, nil
}

//UpdateArtboard for updating rows
func UpdateArtboard(db *sql.DB, slug string, image string) (*Artboard, error) {
	artboard := Artboard{}

	row, _ := db.Query(
		"UPDATE artboard SET image=$1 WHERE slug LIKE $2 RETURNING *;",
		image,
		slug,
	)

	for row.Next() {
		if err := row.Scan(&artboard.Id, &artboard.Slug, &artboard.Image, &artboard.CreatedAt); err != nil {
			log.Fatal("sql error: %s", err.Error())
			return nil, err
		}
	}

	return &artboard, nil
}

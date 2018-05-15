package models

import (
	"database/sql"
	"drawing/utils"
	"time"
)

// Artboard row structure
type Artboard struct {
	Id        int64     `json:"id"`
	Slug      string    `json:"slug"`
	CreatedAt time.Time `json:"created_at"`
}

// Create Artboard Action
func CreateArtboard(db *sql.DB) (*Artboard, error) {
	created := Artboard{}
	slug := utils.RandStringBytes(4)
	createdAt := time.Now()

	row, _ := db.Query(
		"INSERT INTO artboard (slug, created_at) VALUES ($1, $2) RETURNING *;",
		slug,
		createdAt,
	)

	row.Next()

	if err := row.Scan(&created.Id, &created.Slug, &created.CreatedAt); err != nil {
		return nil, err
	}

	return &created, nil
}

// Slect Artboard Action
func SelectArtboard(db *sql.DB, slug string) (*Artboard, error) {
	artboard := Artboard{}

	row, _ := db.Query(
		"SELECT * FROM artboard WHERE slug LIKE $1;",
		slug,
	)

	row.Next()

	if err := row.Scan(&artboard.Id, &artboard.Slug, &artboard.CreatedAt); err != nil {
		return nil, err
	}

	return &artboard, nil
}

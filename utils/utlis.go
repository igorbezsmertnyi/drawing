package utils

import (
	"bytes"
	"crypto/md5"
	"encoding/base64"
	"encoding/hex"
	"image/png"
	"math/rand"
	"os"
	"time"

	"github.com/rs/cors"
)

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const maxBodySize = 1024 * 1024

//RandStringBytes method for genetate sha hash for user peer connection
func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}

	hasher := md5.New()
	text := time.Now().String()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil)) + string(b)
}

//SaveFile method for save file
func SaveFile(dataURL string, slug string) (string, error) {
	if _, err := os.Stat("./dist/tmp/"); os.IsNotExist(err) {
		os.MkdirAll("./dist/tmp/", os.ModePerm)
	}

	fileURL := "./dist/tmp/" + slug + ".png"
	filePath := "/static/tmp/" + slug + ".png"
	unbased, err := base64.StdEncoding.DecodeString(dataURL)
	if err != nil {
		return "", err
	}

	image, err := png.Decode(bytes.NewReader(unbased))
	if err != nil {
		return "", err
	}

	f, err := os.Create(fileURL)
	if err != nil {
		return "", err
	}

	defer f.Close()

	png.Encode(f, image)

	return filePath, nil
}

//AllowCors for allowing cors access
func AllowCors() *cors.Cors {
	return cors.New(cors.Options{AllowedOrigins: []string{"*"}})
}

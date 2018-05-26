package utils

import (
	"crypto/md5"
	"encoding/hex"
	"io/ioutil"
	"math/rand"
	"mime/multipart"
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
func SaveFile(file multipart.File, handle *multipart.FileHeader) (string, error) {
	if _, err := os.Stat("./dist/tmp/"); os.IsNotExist(err) {
		os.MkdirAll("./dist/tmp/", os.ModePerm)
	}

	data, err := ioutil.ReadAll(file)
	if err != nil {
		return "", err
	}

	fileURL := "./dist/tmp/" + handle.Filename
	filePath := "/static/tmp/" + handle.Filename

	err = ioutil.WriteFile(fileURL, data, 0666)
	if err != nil {
		return "", err
	}

	return filePath, nil
}

//AllowCors for allowing cors access
func AllowCors() *cors.Cors {
	return cors.New(cors.Options{AllowedOrigins: []string{"*"}})
}

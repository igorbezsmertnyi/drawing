package services

import (
	"bytes"
	"drawing/utils"
	"encoding/base64"
	"log"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var Uploader *s3manager.Uploader

//AWS for assign Upload method
func AWS(uploader *s3manager.Uploader) {
	Uploader = uploader
}

//AWSSession for opening aws session
func AWSSession() (*s3manager.Uploader, error) {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(os.Getenv("AWS_REGION")),
		Credentials: credentials.NewEnvCredentials()},
	)

	if err != nil {
		log.Fatalf("S3 connection error: %s", err.Error())
		return nil, err
	}

	uploader := s3manager.NewUploader(sess)

	return uploader, nil
}

//Upload for divide envirement
func Upload(slug string, dataURL string) (string, error) {
	if os.Getenv("GO_ENV") == "production" {
		buff, _ := base64.StdEncoding.DecodeString(dataURL)
		res, err := Uploader.Upload(&s3manager.UploadInput{
			Bucket:      aws.String(os.Getenv("S3_BUCKET")),
			Key:         aws.String(filepath.Base(slug + ".png")),
			ACL:         aws.String("public-read"),
			ContentType: aws.String("image/png"),
			Body:        bytes.NewReader(buff),
		})

		if err != nil {
			return "", err
		}

		return res.Location, nil
	} else {
		res, err := utils.SaveFile(dataURL, slug)

		if err != nil {
			return "", err
		}

		return res, nil
	}
}

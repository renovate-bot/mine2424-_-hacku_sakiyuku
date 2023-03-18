package main

import (
	"fmt"
	"sakiyuku_backend/app/config"
	"sakiyuku_backend/app/domain/repository"
	"sakiyuku_backend/app/server"

	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(".env"); err != nil {
		fmt.Printf("読み込み出来ませんでした: %v", err)
	}

	godotenv.Load()

	if err := repository.InitDB(); err != nil {
		panic(err)
	}

	var isDebug bool

	if config.GetenvOrDefault("APP_ENV", "dev") == "dev" {
		isDebug = true
	}

	server.NewRouter(isDebug)
}

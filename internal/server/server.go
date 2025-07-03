package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/joho/godotenv/autoload"

	"btc-dao/internal/database"
)

type Server struct {
	port int

	db   database.Service
	bcli *bitcoinClient
}

func NewServer() *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	NewServer := &Server{
		port: port,

		db: database.New(),
		bcli: &bitcoinClient{
			Username: os.Getenv("BTC_RPC_USER"),
			Password: os.Getenv("BTC_RPC_PASSWORD"),
			URL:      os.Getenv("BTC_RPC_URL"),
		},
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}

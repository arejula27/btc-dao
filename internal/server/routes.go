package server

import (
	"net/http"

	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (s *Server) RegisterRoutes() http.Handler {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"https://*", "http://*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowHeaders:     []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	e.GET("/", s.HelloWorldHandler)

	e.GET("/health", s.healthHandler)

	//BITCOIN ROUTES
	// this routes works as a btc node proxy
	//create group for Bitcoin related routes
	btcGroup := e.Group("/btc")
	// Register the Bitcoin balance handler
	btcGroup.GET("/getBalance", s.GetBalanceHandler)

	return e
}

func (s *Server) HelloWorldHandler(c echo.Context) error {
	resp := map[string]string{
		"message": "Hello World",
	}

	return c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, s.db.Health())
}

// GetBalanceHandler handles the request to get the balance of a Bitcoin wallet.
// It will obtain the user from the context, gather his descriptor from the database
func (s *Server) GetBalanceHandler(c echo.Context) error {

	// Gather from database
	descriptor := "tr([05ebc07a/86h/1h/0h]tpubDCCqg9reqruTFN8nhdZU7CyCJL17EGKWEjiyUrKWauothvMN4Rr1FFsnLG5ocaQQyD63ZnUfnfCLGWChYhd1QqgLVpo6PBNwejXRcSmyt2Y/<0;1>/*)#6v7wxu2x"

	// Call Bitcoin RPC to get balance
	balance, err := s.bcli.GetBalance(descriptor)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": fmt.Sprintf("failed to get balance: %v", err),
		})
	}
	// return the balance
	return c.JSON(http.StatusOK, map[string]float64{
		"balance": balance,
	})
}

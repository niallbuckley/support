// main.go

package main

import (
    //"net/http"

    "github.com/labstack/echo/v4"
)

func main() {
    // Create a new Echo instance
    e := echo.New()

    // Serve static files from the "dist" directory
    e.Static("/", "../dist")

    // Start the server
    e.Logger.Fatal(e.Start(":8080"))
}

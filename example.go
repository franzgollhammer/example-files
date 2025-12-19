// File: main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// helloHandler responds with "Hello, World!"
func helloHandler(w http.ResponseWriter, r *http.Request) {
	logRequest(r)
	fmt.Fprintln(w, "Hello, World!")
}

// timeHandler responds with the current server time
func timeHandler(w http.ResponseWriter, r *http.Request) {
	logRequest(r)
	currentTime := time.Now().Format(time.RFC1123)
	fmt.Fprintf(w, "Current Server Time: %s", currentTime)
}

// greetHandler responds with a personalized greeting
func greetHandler(w http.ResponseWriter, r *http.Request) {
	logRequest(r)
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "Guest"
	}
	fmt.Fprintf(w, "Hello, %s!", name)
}

// logRequest logs the details of the incoming HTTP request
func logRequest(r *http.Request) {
	log.Printf("Received request: %s %s from %s", r.Method, r.URL.Path, r.RemoteAddr)
}

// notFoundHandler responds with a custom 404 message
func notFoundHandler(w http.ResponseWriter, r *http.Request) {
	logRequest(r)
	w.WriteHeader(http.StatusNotFound)
	fmt.Fprintln(w, "Custom 404: Page not found!")
}

// main sets up the HTTP server and routes
func main() {
	// Route handlers
	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/time", timeHandler)
	http.HandleFunc("/greet", greetHandler)

	// Custom 404 handler
	http.HandleFunc("/404", notFoundHandler)

	// Starting the server
	port := ":8080"
	log.Printf("Starting server on %s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
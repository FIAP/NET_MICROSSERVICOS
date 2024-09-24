package handlers

import (
	"encoding/json"
	"go-auth/models" // Importing the models package
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// Simulating a user database
var users = map[string]models.User{
	"admin":     {"admin", "admin123", "ADM"},
	"professor": {"professor", "professor123", "Professor"},
	"candidate": {"candidate", "candidate123", "Candidato"},
	"empresa":   {"empresa", "empresa123", "Empresa"},
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var creds models.Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	user, ok := users[creds.Username]
	if !ok || user.Password != creds.Password {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Create the JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"role":     user.Role,
		"exp":      time.Now().Add(time.Hour * 1).Unix(),
	})

	jwtSecret := os.Getenv("JWT_SECRET")
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		http.Error(w, "Error creating token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func SecureHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("You have accessed a protected route!"))
}

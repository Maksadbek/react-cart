package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Species struct {
	Name  string
	Img   string
	Price int
	Id    int
}

func main() {
	http.HandleFunc("/species", handler)
	http.Handle("/", http.FileServer(http.Dir("./")))
	log.Fatal(http.ListenAndServe(":1234", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	spe := []Species{
		Species{
			Id:    1,
			Name:  "souse",
			Img:   "/assets/img/vsvFUN7.jpg",
			Price: 1000,
		},
		Species{
			Id:    2,
			Name:  "spuce",
			Img:   "/assets/img/5W28ZCj.gif",
			Price: 4000,
		},
		Species{
			Id:    3,
			Name:  "souse chili",
			Img:   "/assets/img/pQY0BPI.jpg",
			Price: 14000,
		},
		Species{
			Id:    4,
			Name:  "souse chili",
			Img:   "/assets/img/pQY0BPI.jpg",
			Price: 14000,
		},
		Species{
			Id:    5,
			Name:  "souse chili",
			Img:   "/assets/img/pQY0BPI.jpg",
			Price: 14000,
		},
	}

	speJson, err := json.Marshal(spe)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, string(speJson))
}

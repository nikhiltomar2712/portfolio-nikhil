package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Signal struct {
	GeneratedBy string   `json:"generated_by"`
	Primary     string   `json:"primary"`
	Secondary   []string `json:"secondary"`
	Score       int      `json:"score"`
	Advice      []string `json:"advice"`
}

func main() {
	signal := Signal{
		GeneratedBy: "Go",
		Primary:     "Red Team Cyber Security in Japan",
		Secondary: []string{
			"Python automation",
			"Threat hunting",
			"Japanese N3 to N2",
			"GitHub project evidence",
		},
		Score: 78,
		Advice: []string{
			"Create short writeups for every security lab.",
			"Build one polished Python security utility.",
			"Add Japanese summaries to selected portfolio pages.",
			"Practice interview stories around impact, ethics, and teamwork.",
		},
	}

	root, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	target := filepath.Join(root, "public", "data", "go-signal.json")
	if err := os.MkdirAll(filepath.Dir(target), 0o755); err != nil {
		panic(err)
	}

	payload, err := json.MarshalIndent(signal, "", "  ")
	if err != nil {
		panic(err)
	}

	if err := os.WriteFile(target, payload, 0o644); err != nil {
		panic(err)
	}

	fmt.Printf("Generated %s\n", target)
}

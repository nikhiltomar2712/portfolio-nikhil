from __future__ import annotations

import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PUBLIC = ROOT / "public"

PROFILE = {
    "name": "Nikhil Tomar",
    "handle": "nikhiltomar2712",
    "location": "New Delhi, India",
    "goal": "Cyber Security Engineer in Japan",
    "focus": ["red team", "ethical hacking", "threat hunting", "Python automation"],
    "japanese_level": "N3",
}


class PortfolioHandler(SimpleHTTPRequestHandler):
    server_version = "NikhilCyberPortfolio/1.0"

    def __init__(self, *args, **kwargs):
        directory = DIST if DIST.exists() else ROOT
        super().__init__(*args, directory=str(directory), **kwargs)

    def do_GET(self):  # noqa: N802 - stdlib handler API
        path = urlparse(self.path).path
        if path == "/api/profile":
            self.send_json(PROFILE)
            return
        if path == "/api/ops":
            self.send_json(self.operations_payload())
            return
        if path.startswith("/data/") and not DIST.exists():
            self.path = str(PUBLIC / path.removeprefix("/"))
        super().do_GET()

    def end_headers(self):  # noqa: N802 - stdlib handler API
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, payload):
        encoded = json.dumps(payload, indent=2).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    @staticmethod
    def operations_payload():
        return {
            "readiness": 72,
            "next_targets": [
                "Publish red team lab writeups",
                "Build Python recon utilities",
                "Practice Japanese security vocabulary",
                "Document threat hunting notes",
            ],
            "portfolio_languages": ["Python", "CSS", "JavaScript", "HTML", "TypeScript", "Go", "Ruby"],
        }


def run(host: str = "127.0.0.1", port: int = 8088):
    server = ThreadingHTTPServer((host, port), PortfolioHandler)
    print(f"Python portfolio server running at http://{host}:{port}")
    print("Build with `npm run build` for dist mode, or use Vite with `npm run dev`.")
    server.serve_forever()


if __name__ == "__main__":
    run()

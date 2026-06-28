#!/usr/bin/env python3
"""Serve the visual workout plan locally."""

from __future__ import annotations

import http.server
import socketserver
import webbrowser
from functools import partial
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PORT = 8765


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:  # noqa: A002 - stdlib name
        print(f"{self.address_string()} - {format % args}")


def main() -> None:
    handler = partial(QuietHandler, directory=str(ROOT))
    url = f"http://localhost:{PORT}/web/"
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving workout plan at {url}")
        webbrowser.open(url)
        httpd.serve_forever()


if __name__ == "__main__":
    main()

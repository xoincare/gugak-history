"""국악의 역사 웹서버 (Cloud Run용)"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

PORT = int(os.environ.get('PORT', 8080))

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        return super().do_GET()

if __name__ == '__main__':
    print(f"Serving on port {PORT}")
    HTTPServer(('0.0.0.0', PORT), Handler).serve_forever()

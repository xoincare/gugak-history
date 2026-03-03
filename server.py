"""
Harmonia Backend v3.1 (Lightweight)
- SQLite DB bundled in container
- Local MIDI file serving
- No GCS dependency at startup (fast cold start)
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os, json, sqlite3, urllib.parse, shutil

PORT = int(os.environ.get('PORT', 8080))
DB_FILE = 'harmonia.db'
LOCAL_DB = '/tmp/harmonia.db'

def init_db():
    """Copy bundled DB to /tmp on startup"""
    if os.path.exists(DB_FILE) and not os.path.exists(LOCAL_DB):
        shutil.copy2(DB_FILE, LOCAL_DB)
        print(f"✅ DB ready: {DB_FILE} ({os.path.getsize(DB_FILE) // 1024}KB)")
    elif not os.path.exists(LOCAL_DB):
        conn = sqlite3.connect(LOCAL_DB)
        conn.execute("CREATE TABLE IF NOT EXISTS tracks (id INTEGER PRIMARY KEY, title TEXT, composer TEXT, dataset TEXT, era TEXT, tags TEXT, path TEXT, license_type TEXT, license_summary TEXT)")
        conn.close()
        print("⚠️ Empty fallback DB created")

class HarmoniaHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)

        if parsed.path == '/api/search':
            query = urllib.parse.parse_qs(parsed.query).get('q', [''])[0]
            self._json_response(self.search_db(query))
            return

        if parsed.path == '/api/channel':
            channel_id = urllib.parse.parse_qs(parsed.query).get('id', [''])[0]
            self._json_response(self.get_channel_songs(channel_id))
            return

        if self.path in ('/', ''):
            self.path = '/index.html'
        return super().do_GET()

    def _json_response(self, data):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode())

    def search_db(self, query):
        if len(query) < 2:
            return []
        try:
            conn = sqlite3.connect(LOCAL_DB)
            c = conn.cursor()
            q = f"%{query}%"
            c.execute('''SELECT id, title, composer, dataset, era, tags, license_type, license_summary 
                         FROM tracks 
                         WHERE title LIKE ? OR composer LIKE ? OR tags LIKE ?
                         LIMIT 100''', (q, q, q))
            rows = c.fetchall()
            conn.close()
            return [{"id": r[0], "title": r[1], "composer": r[2], "dataset": r[3], "era": r[4], "tags": r[5], "license": r[6], "license_text": r[7]} for r in rows]
        except Exception as e:
            print(f"Search error: {e}")
            return []

    def get_channel_songs(self, channel_id):
        try:
            conn = sqlite3.connect(LOCAL_DB)
            c = conn.cursor()
            dataset_map = {
                'classical': 'mutopia_midi',
                'korean_master': 'korean_jeongganbo',
                'piano_healing': 'adl-piano-midi',
            }
            dataset = dataset_map.get(channel_id)
            if dataset:
                c.execute('SELECT id, title, composer, dataset, era, tags, license_type, license_summary FROM tracks WHERE dataset = ? ORDER BY title LIMIT 100', (dataset,))
            else:
                c.execute('SELECT id, title, composer, dataset, era, tags, license_type, license_summary FROM tracks ORDER BY RANDOM() LIMIT 100')
            rows = c.fetchall()
            conn.close()
            return [{"id": r[0], "title": r[1], "composer": r[2], "dataset": r[3], "era": r[4], "tags": r[5], "license": r[6], "license_text": r[7]} for r in rows]
        except Exception as e:
            print(f"Channel error: {e}")
            return []

if __name__ == '__main__':
    init_db()
    print(f"🎵 Harmonia server starting on port {PORT}")
    HTTPServer(('0.0.0.0', PORT), HarmoniaHandler).serve_forever()

const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app      = express();
const PORT     = 8743;
const DATA_DIR = process.env.DATA_DIR || '/data';
const DATA_FILE = path.join(DATA_DIR, 'state.json');

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// GET /api/state — return saved state (or null on first run)
app.get('/api/state', (req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      res.json(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
    } else {
      res.json(null);
    }
  } catch (e) {
    console.error('Read error:', e.message);
    res.status(500).json({ error: 'Failed to read state' });
  }
});

// POST /api/state — persist state (atomic write to avoid corruption)
app.post('/api/state', (req, res) => {
  try {
    const tmp = DATA_FILE + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(req.body));
    fs.renameSync(tmp, DATA_FILE);
    res.json({ ok: true });
  } catch (e) {
    console.error('Write error:', e.message);
    res.status(500).json({ error: 'Failed to save state' });
  }
});

// Fallback — serve the SPA for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Personal Finance Dashboard → http://localhost:${PORT}`);
});

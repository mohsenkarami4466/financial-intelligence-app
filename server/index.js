import express from 'express';
import cors from 'cors';
import mockData from '../src/data/mockData.js';
import marketLocations from '../src/data/marketLocations.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/** در حافظه – همسان با Zustand در فرانت‌اند */
let alerts = [...mockData.alerts];
let preferences = {
  interests: ['USD', 'Gold', 'Crypto', 'Stocks', 'Economic News'],
  notificationLevel: 'important',
};

// ─── Market ───────────────────────────────────────────────

app.get('/api/market/summary', (_req, res) => {
  res.json({
    data: { assets: mockData.assets, market: mockData.market },
    error: null,
  });
});

app.get('/api/market/events', (_req, res) => {
  res.json({ data: mockData.keyEvent, error: null });
});

app.get('/api/market/brief', (_req, res) => {
  res.json({ data: mockData.brief, error: null });
});

app.get('/api/market/all', (_req, res) => {
  res.json({
    data: {
      assets: mockData.assets,
      market: mockData.market,
      keyEvent: mockData.keyEvent,
      brief: mockData.brief,
    },
    error: null,
  });
});

app.get('/api/market/locations', (_req, res) => {
  res.json({ data: marketLocations, error: null });
});

// ─── Alerts ───────────────────────────────────────────────

app.get('/api/alerts', (_req, res) => {
  res.json({ data: alerts, error: null });
});

app.post('/api/alerts', (req, res) => {
  const alert = { id: Date.now(), active: true, ...req.body };
  alerts.push(alert);
  res.status(201).json({ data: alert, error: null });
});

app.patch('/api/alerts/:id/toggle', (req, res) => {
  const id = req.params.id;
  const idx = alerts.findIndex((a) => String(a.id) === String(id));
  if (idx === -1) {
    return res.status(404).json({ data: null, error: 'Alert not found' });
  }
  alerts[idx] = { ...alerts[idx], active: !alerts[idx].active };
  res.json({ data: alerts[idx], error: null });
});

// ─── User preferences ─────────────────────────────────────

app.get('/api/user/preferences', (_req, res) => {
  res.json({ data: preferences, error: null });
});

app.put('/api/user/preferences', (req, res) => {
  preferences = { ...preferences, ...req.body };
  res.json({ data: preferences, error: null });
});

// ─── Health ───────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.json({ data: { status: 'ok' }, error: null });
});

app.use((_req, res) => {
  res.status(404).json({ data: null, error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Financial Intelligence API running on http://localhost:${PORT}`);
});

# Financial Intelligence API Specification

Base URL (development): `http://localhost:3001/api`  
Base URL (frontend proxy): `/api`

All responses follow this envelope:

```json
{
  "data": "<payload or null>",
  "error": "<message or null>"
}
```

Error HTTP status codes: `404`, `500` as appropriate.

---

## Health

### `GET /health`

**Response 200**

```json
{ "data": { "status": "ok" }, "error": null }
```

---

## Market

### `GET /market/summary`

Returns tracked assets and market overview items.

**Response 200**

```json
{
  "data": {
    "assets": [
      {
        "id": "usd",
        "name": "USD/IRR",
        "type": "currency",
        "price": 595000,
        "change": 2.3,
        "history": [590000, 592000, 595000]
      }
    ],
    "market": [
      { "name": "USD/IRR", "trend": "up", "value": 2.3 }
    ]
  },
  "error": null
}
```

---

### `GET /market/events`

Returns the key event of the day.

**Response 200**

```json
{
  "data": {
    "title": "Federal Reserve Signals Rate Pause",
    "summary": "...",
    "affectedAssets": ["Gold", "Bitcoin", "USD/IRR"]
  },
  "error": null
}
```

---

### `GET /market/brief`

Returns AI daily brief bullet points.

**Response 200**

```json
{
  "data": [
    { "text": "Global markets mixed...", "relatedAssets": [] },
    { "text": "Gold dips...", "relatedAssets": ["Gold"] }
  ],
  "error": null
}
```

---

### `GET /market/all`

Combined market payload (assets, market, keyEvent, brief).

---

### `GET /market/locations`

Returns global exchange locations for the globe/map feature.

---

## Alerts

### `GET /alerts`

**Response 200**

```json
{
  "data": [
    {
      "id": 1,
      "type": "price",
      "assetId": "gold",
      "condition": "below",
      "value": 2300,
      "active": true,
      "message": "Gold below $2300"
    }
  ],
  "error": null
}
```

---

### `POST /alerts`

**Request body**

```json
{
  "type": "price",
  "assetId": "btc",
  "condition": "above",
  "value": 70000,
  "message": "Bitcoin above $70000"
}
```

**Response 201** – created alert with generated `id`.

---

### `PATCH /alerts/:id/toggle`

Toggles `active` flag.

**Response 200** – updated alert.

**Response 404**

```json
{ "data": null, "error": "Alert not found" }
```

---

## User Preferences

### `GET /user/preferences`

**Response 200**

```json
{
  "data": {
    "interests": ["USD", "Gold", "Crypto"],
    "notificationLevel": "important"
  },
  "error": null
}
```

`notificationLevel`: `"important"` | `"daily"` | `"realtime"`

---

### `PUT /user/preferences`

**Request body** (partial update allowed)

```json
{
  "interests": ["Gold", "Crypto"],
  "notificationLevel": "daily"
}
```

**Response 200** – full updated preferences object.

---

## Frontend environment variables

| Variable | Description |
|----------|-------------|
| `VITE_USE_MOCK` | `true` = use in-app mock (GitHub Pages). `false` = call API. |
| `VITE_API_BASE_URL` | Axios base URL (default `/api` via Vite proxy in dev). |

## Running locally

```bash
npm run dev        # Vite + Express concurrently
npm run dev:server # API only (port 3001)
npm run build      # Production build with mock API (GitHub Pages)
```

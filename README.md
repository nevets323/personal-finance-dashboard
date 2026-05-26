# Personal Finance Dashboard

A self-hosted personal finance tracker for managing bills, tracking debt, and visualizing monthly spending. Runs entirely in the browser — all data is stored in your browser's `localStorage`, nothing is sent to any server.

## Features

- **Dashboard** — monthly bill summary, upcoming due dates, debt overview, and a full-year spending trend chart
- **Bills** — sortable bill list with per-bill monthly history, year/month navigation, and status tracking (Unpaid / Processing / Paid)
- **Calendar** — month grid view with bills plotted by due date; click any chip to cycle its status
- **Debt** — track balances across multiple accounts with history snapshots and trend charts
- **Tweaks panel** — row density, accent color, and a "hide paid bills" toggle

## Quick Start

### Docker (recommended)

```bash
docker compose up -d
```

Open **http://localhost:8743** in your browser.

### Without Docker

Open `Personal Finance.html` directly in any modern browser — no build step or server required.

## Port

The container listens on **port 8743**. To use a different port, edit the `ports` mapping in `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:8743"
```

## Entering Your Data

All dollar amounts start at **$0** — the bill names and due dates are pre-filled as a template.

1. Go to **Bills**, select a month, and click the ✏️ edit icon on any row to enter the amount
2. Go to **Debt** and click **+ Add debt** to add your accounts
3. Use **+ Add bill** to add any bills not already listed, or the 🗑️ icon to remove ones you don't need

Data persists in `localStorage` — it survives page refreshes but is tied to the browser you use.

## Resetting Data

Open the **Tweaks** panel (gear/edit icon) and click **Reset to blank defaults** to wipe all entered data and start over.

## Stack

- React 18 (CDN, no build step)
- Babel Standalone (in-browser JSX transpilation)
- Geist font (Google Fonts)
- nginx:alpine (Docker)

## Building the Image

```bash
docker build -t finance-dashboard .
docker run -d -p 8743:8743 --name finance-dashboard finance-dashboard
```

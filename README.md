# Personal Finance Dashboard

A self-hosted personal finance tracker for managing bills, tracking debt, and visualizing monthly spending. Data is stored centrally on the server so every device that opens the app sees the same information.

## Features

- **Dashboard** — monthly bill summary, upcoming due dates, debt overview, and a full-year spending trend chart
- **Bills** — bill list with year/month navigation, per-bill monthly history, and status tracking (Unpaid / Processing / Paid)
- **Calendar** — month grid view with bills plotted by due date; click any chip to cycle its status
- **Debt** — track balances across multiple accounts with history snapshots and trend charts
- **Tweaks panel** — row density, accent color, and a "hide paid bills" toggle
- **Shared data** — all changes sync to the server instantly; every PC/browser sees the same state

## Quick Start

```bash
docker compose up -d
```

Open **http://\<your-server-ip\>:8743** from any device on your network.

## Port

The app runs on **port 8743**. To change it, edit `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:8743"
```

## Data Persistence

State is saved to `/data/state.json` inside the container, backed by a named Docker volume (`finance-data`). The volume survives container restarts and rebuilds.

```bash
# Where the data lives on the host
docker volume inspect finance-data
```

To back up your data:
```bash
docker cp finance-dashboard:/data/state.json ./state-backup.json
```

To restore:
```bash
docker cp ./state-backup.json finance-dashboard:/data/state.json
```

## Entering Your Data

All dollar amounts start at **$0** — bill names and due dates are pre-filled as a template.

1. Go to **Bills**, select a month, and click the ✏️ edit icon on any row to enter your amount
2. Go to **Debt** and click **+ Add debt** to add your accounts
3. Use **+ Add bill** to add any bills not already listed, or 🗑️ to remove ones you don't need

## Resetting Data

Open the **Tweaks** panel and click **Reset to blank defaults** to wipe all data and start over.

## Stack

- React 18 (CDN, no build step)
- Babel Standalone (in-browser JSX transpilation)
- Node.js + Express (backend / data persistence)
- Geist font (Google Fonts)
- node:20-alpine (Docker)

## Building Manually

```bash
docker build -t finance-dashboard .
docker run -d -p 8743:8743 -v finance-data:/data --name finance-dashboard finance-dashboard
```

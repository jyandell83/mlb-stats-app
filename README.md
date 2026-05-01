# MLB Live Game Tracker

Live Demo: https://live-mlb-dashboard.vercel.app/

A real-time baseball scoreboard application that displays live MLB games, detailed game data, and player statistics.

This project was built to explore working with live sports data, handling incomplete/streaming datasets, and creating a clean, interactive UI for rapidly updating information.

---

## Overview

The MLB Live Game Tracker provides a streamlined way to follow daily games. Users can view all games happening today, drill into individual matchups, and explore player-level stats — all in a responsive interface powered by live data.

The app emphasizes clarity and usability, especially in scenarios where game data is incomplete or constantly updating (e.g. early innings, in-progress games).

---

## Version 1 Features

- **Daily Scoreboard**
  - Displays all MLB games for the current day
  - Automatically updates to reflect live game progress

- **Game Details View**
  - Expanded view for each game
  - Inning-by-inning breakdown
  - Key game information and context

- **Player Stat Modals**
  - Clickable player names
  - Modal-based UI for quick stat access
  - Avoids navigating away from the game view

- **Live Data Handling**
  - Gracefully handles partial/in-progress data
  - Supports early, mid, and final game states

---

## Tech Stack

- **Frontend:** React
- **Data Source:** MLB Stats API
- **Styling:** CSS (custom)

---

## Current Focus

This project is actively being developed and refined. Current efforts are focused on:

- Improving UI consistency and visual polish
- Enhancing data presentation (especially inning-by-inning views)
- Making interactions feel faster and more intuitive

---

## Future Iterations

Planned improvements and features include:

### UI / UX

- Team logos and improved visual identity
- Mobile responsiveness and layout optimization
- Better loading and empty states

### Data & Features

- League leaders page (powered by a custom SQL database)
- Advanced stat views and filtering
- Game state indicators (live, final, delayed, etc.)

### Backend Expansion

- Introduce a Node.js + PostgreSQL backend
- Store and query player statistics
- Build custom leaderboards using SQL (e.g. home runs, batting average)

### Performance

- Optimize data fetching and refresh intervals
- Reduce unnecessary re-renders

---

## Goals

- Build a production-style frontend using real-time data
- Practice handling incomplete and dynamic datasets
- Expand into full-stack development with SQL and backend APIs
- Create a portfolio project that demonstrates both UI and data handling skills

---

## Status

🚧 In active development — new features and improvements are continuously being added.

---

## Getting Started

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm start
```

---

## Notes

This project is not affiliated with or endorsed by Major League Baseball. Data is provided via the MLB Stats API.

---

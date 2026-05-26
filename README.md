# DeskFlow - Simple Ticket Management System

A beginner-friendly MERN stack application for managing support tickets with SLA tracking.

**Note:** This version uses **in-memory storage** (JavaScript array) instead of MongoDB. Data will be lost when the server restarts.

## Features

- ✅ Create, view, update, and delete tickets
- ✅ 4-column Kanban board (Open, In Progress, Resolved, Closed)
- ✅ Priority levels (Low, Medium, High, Urgent)
- ✅ SLA tracking with breach indicators
- ✅ Status transition validation
- ✅ Filter by priority and SLA breach status
- ✅ Real-time age calculation
- ✅ Simple, clean CSS design
- ✅ No database required - runs immediately

## Tech Stack

**Frontend:**
- React 18
- Vite
- Axios
- Simple CSS

**Backend:**
- Node.js
- Express
- In-memory array storage (no database)

## Project Structure

```
deskflow/
├── backend/
│   ├── routes/
│   │   └── tickets.js (in-memory storage + API routes)
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TicketBoard.jsx
    │   │   ├── TicketCard.jsx
    │   │   ├── TicketForm.jsx
    │   │   └── Filters.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── .env.example
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

**Note:** All ticket data is stored in memory and will be lost when you restart the server.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
copy .env.example .env
```

4. Update `.env` if needed (default is fine for local development):
```
VITE_API_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Tickets

- `GET /tickets` - Get all tickets
- `POST /tickets` - Create a new ticket
- `PATCH /tickets/:id` - Update a ticket
- `DELETE /tickets/:id` - Delete a ticket
- `GET /tickets/stats` - Get ticket statistics

### Status Transitions

**Allowed transitions:**
- `open` → `in_progress`
- `in_progress` → `resolved` or back to `open`
- `resolved` → `closed` or back to `in_progress`
- `closed` → (no transitions allowed)

Invalid transitions return a 400 error.

## SLA Rules

- **Urgent**: 1 hour (60 minutes)
- **High**: 4 hours (240 minutes)
- **Medium**: 24 hours (1440 minutes)
- **Low**: 72 hours (4320 minutes)

Tickets show a "SLA Breached" badge when they exceed their time limit while in `open` or `in_progress` status.

## Usage

1. Click **"+ New Ticket"** to create a ticket
2. Fill in the subject, description, email, and priority
3. Tickets appear in the **Open** column
4. Click **"Start"** to move to **In Progress**
5. Click **"Resolve"** to move to **Resolved**
6. Click **"Close"** to move to **Closed**
7. Use **"← Back"** buttons to move tickets backward
8. Use filters to view specific priorities or breached tickets
9. Click **"Delete"** to remove a ticket

## Building for Production

### Backend

```bash
cd backend
npm start
```

Deploy to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean

**Important:** Since this uses in-memory storage, all data will be lost on server restart. For production, consider adding persistent storage (file system, database, etc.).

### Frontend

```bash
cd frontend
npm run build
```

The `dist` folder contains the production build. Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Remember to update `VITE_API_URL` in your production environment variables to point to your deployed backend.

## Environment Variables

### Backend
No environment variables required! The server runs on port 5000 by default.

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Troubleshooting

**Backend won't start:**
- Ensure all dependencies are installed (`npm install`)
- Check that port 5000 is not already in use

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env
- Check browser console for CORS errors

**CORS errors:**
- Backend already includes CORS middleware
- Ensure backend is running before frontend

**Data disappears:**
- This is expected! The app uses in-memory storage
- Data is lost when the backend server restarts
- This is perfect for development and testing

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

# DeskFlow - Quick Start Guide

## 🚀 Get Started in 3 Minutes

No database setup required! This app uses in-memory storage.

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Start Backend Server

```bash
npm start
```

You should see:
```
Server is running on port 5000
Using in-memory storage - data will be lost on restart
```

### Step 3: Install Frontend Dependencies

Open a **new terminal** and run:

```bash
cd frontend
npm install
```

### Step 4: Start Frontend

```bash
npm run dev
```

You should see:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Step 5: Open Your Browser

Go to: **http://localhost:5173**

## 🎉 You're Done!

Now you can:

1. **Create a ticket** - Click "+ New Ticket"
2. **Move tickets** - Use the "Start", "Resolve", "Close" buttons
3. **Filter tickets** - Use priority dropdown or SLA breached checkbox
4. **Delete tickets** - Click the "Delete" button

## 📝 Sample Ticket Data

Try creating these tickets to test the SLA feature:

**Urgent Ticket** (1 hour SLA):
- Subject: "Production server down"
- Priority: Urgent
- Will breach in 60 minutes

**High Priority** (4 hour SLA):
- Subject: "Payment processing error"
- Priority: High
- Will breach in 4 hours

**Medium Priority** (24 hour SLA):
- Subject: "Feature request"
- Priority: Medium
- Will breach in 24 hours

**Low Priority** (72 hour SLA):
- Subject: "Documentation update"
- Priority: Low
- Will breach in 72 hours

## ⚠️ Important Notes

- **Data is temporary**: All tickets are stored in memory
- **Restart = Reset**: Stopping the backend server clears all data
- **Perfect for**: Learning, testing, demos, and development

## 🛠️ Development Mode

For auto-reload during development:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## 🔧 Troubleshooting

**Port 5000 already in use?**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change the port in backend/server.js
const PORT = process.env.PORT || 5001;
```

**Frontend can't connect to backend?**
- Make sure backend is running on port 5000
- Check `frontend/.env` has `VITE_API_URL=http://localhost:5000`
- Restart the frontend dev server after changing .env

**Need to clear data?**
- Just restart the backend server!

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [CHANGES.md](CHANGES.md) to see what was changed from MongoDB version
- Explore the code in `backend/routes/tickets.js` to see how it works

## 🎯 API Endpoints

Test the API directly:

```bash
# Get all tickets
curl http://localhost:5000/tickets

# Create a ticket
curl -X POST http://localhost:5000/tickets \
  -H "Content-Type: application/json" \
  -d '{"subject":"Test","description":"Testing","customerEmail":"test@example.com","priority":"medium"}'

# Get stats
curl http://localhost:5000/tickets/stats
```

Enjoy building with DeskFlow! 🎊

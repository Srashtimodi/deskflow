const express = require('express');
const router = express.Router();

// In-memory storage
let tickets = [];
let nextId = 1;

// Helper function to calculate derived fields
function addDerivedFields(ticket) {
  // Calculate age in minutes
  const ageMinutes = Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60));
  
  // SLA limits in minutes
  const slaMinutes = {
    urgent: 60,
    high: 240,
    medium: 1440,
    low: 4320
  };
  
  // Check if SLA is breached (only for open and in_progress)
  const slaBreached = (ticket.status === 'open' || ticket.status === 'in_progress') 
    && ageMinutes > slaMinutes[ticket.priority];
  
  return {
    ...ticket,
    ageMinutes,
    slaBreached
  };
}

// GET /tickets/stats - Get ticket statistics
router.get('/stats', (req, res) => {
  try {
    const byStatus = {};
    
    tickets.forEach(ticket => {
      byStatus[ticket.status] = (byStatus[ticket.status] || 0) + 1;
    });
    
    const stats = {
      total: tickets.length,
      byStatus
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /tickets - Get all tickets
router.get('/', (req, res) => {
  try {
    // Add derived fields and sort by createdAt (newest first)
    const ticketsWithFields = tickets
      .map(ticket => addDerivedFields(ticket))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json(ticketsWithFields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /tickets - Create a new ticket
router.post('/', (req, res) => {
  try {
    const { subject, description, customerEmail, priority } = req.body;
    
    // Validation
    if (!subject || !description || !customerEmail || !priority) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (!['low', 'medium', 'high', 'urgent'].includes(priority)) {
      return res.status(400).json({ message: 'Invalid priority' });
    }
    
    const newTicket = {
      _id: String(nextId++),
      subject: subject.trim(),
      description,
      customerEmail: customerEmail.trim().toLowerCase(),
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      resolvedAt: null
    };
    
    tickets.push(newTicket);
    
    res.status(201).json(addDerivedFields(newTicket));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /tickets/:id - Update a ticket
router.patch('/:id', (req, res) => {
  try {
    const ticketIndex = tickets.findIndex(t => t._id === req.params.id);
    
    if (ticketIndex === -1) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    const ticket = tickets[ticketIndex];

    // Handle status transitions
    if (req.body.status && req.body.status !== ticket.status) {
      const currentStatus = ticket.status;
      const newStatus = req.body.status;
      
      // Define valid transitions
      const validTransitions = {
        open: ['in_progress'],
        in_progress: ['resolved', 'open'],
        resolved: ['closed', 'in_progress'],
        closed: []
      };
      
      // Check if transition is valid
      if (!validTransitions[currentStatus].includes(newStatus)) {
        return res.status(400).json({ 
          message: `Invalid status transition from ${currentStatus} to ${newStatus}` 
        });
      }
      
      ticket.status = newStatus;
      
      // Set resolvedAt when moving to resolved
      if (newStatus === 'resolved') {
        ticket.resolvedAt = new Date().toISOString();
      }
      
      // Clear resolvedAt when moving back from resolved
      if (currentStatus === 'resolved' && newStatus === 'in_progress') {
        ticket.resolvedAt = null;
      }
    }

    // Update other fields if provided
    if (req.body.subject) ticket.subject = req.body.subject.trim();
    if (req.body.description) ticket.description = req.body.description;
    if (req.body.customerEmail) ticket.customerEmail = req.body.customerEmail.trim().toLowerCase();
    if (req.body.priority) {
      if (!['low', 'medium', 'high', 'urgent'].includes(req.body.priority)) {
        return res.status(400).json({ message: 'Invalid priority' });
      }
      ticket.priority = req.body.priority;
    }

    tickets[ticketIndex] = ticket;
    
    res.json(addDerivedFields(ticket));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /tickets/:id - Delete a ticket
router.delete('/:id', (req, res) => {
  try {
    const ticketIndex = tickets.findIndex(t => t._id === req.params.id);
    
    if (ticketIndex === -1) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    tickets.splice(ticketIndex, 1);
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

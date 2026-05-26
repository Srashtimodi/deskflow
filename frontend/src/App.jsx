import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TicketForm from './components/TicketForm';
import TicketBoard from './components/TicketBoard';
import Filters from './components/Filters';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [breachedFilter, setBreachedFilter] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_URL}/tickets`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      alert('Failed to fetch tickets');
    }
  };

  const createTicket = async (ticketData) => {
    try {
      await axios.post(`${API_URL}/tickets`, ticketData);
      fetchTickets();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket');
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await axios.patch(`${API_URL}/tickets/${ticketId}`, { status: newStatus });
      fetchTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert(error.response?.data?.message || 'Failed to update ticket');
    }
  };

  const deleteTicket = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) {
      return;
    }
    
    try {
      await axios.delete(`${API_URL}/tickets/${ticketId}`);
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert('Failed to delete ticket');
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) {
      return false;
    }
    if (breachedFilter && !ticket.slaBreached) {
      return false;
    }
    return true;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>DeskFlow</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Ticket'}
        </button>
      </header>

      {showForm && (
        <div className="form-container">
          <TicketForm onSubmit={createTicket} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <Filters
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        breachedFilter={breachedFilter}
        setBreachedFilter={setBreachedFilter}
      />

      <TicketBoard
        tickets={filteredTickets}
        onUpdateStatus={updateTicketStatus}
        onDelete={deleteTicket}
      />
    </div>
  );
}

export default App;

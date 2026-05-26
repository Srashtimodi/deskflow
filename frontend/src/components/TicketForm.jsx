import { useState } from 'react';

function TicketForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    customerEmail: '',
    priority: 'medium'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.description || !formData.customerEmail) {
      alert('Please fill in all fields');
      return;
    }
    
    onSubmit(formData);
    setFormData({
      subject: '',
      description: '',
      customerEmail: '',
      priority: 'medium'
    });
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>Create New Ticket</h2>
      
      <div className="form-group">
        <label>Subject *</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief description of the issue"
          required
        />
      </div>

      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description"
          rows="4"
          required
        />
      </div>

      <div className="form-group">
        <label>Customer Email *</label>
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          placeholder="customer@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Priority *</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Create Ticket</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default TicketForm;

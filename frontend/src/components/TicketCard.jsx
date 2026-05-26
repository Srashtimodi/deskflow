function TicketCard({ ticket, onUpdateStatus, onDelete }) {
  const getNextStatus = (currentStatus) => {
    const transitions = {
      open: 'in_progress',
      in_progress: 'resolved',
      resolved: 'closed',
      closed: null
    };
    return transitions[currentStatus];
  };

  const getPreviousStatus = (currentStatus) => {
    if (currentStatus === 'in_progress') return 'open';
    if (currentStatus === 'resolved') return 'in_progress';
    return null;
  };

  const formatAge = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h`;
    return `${Math.floor(minutes / 1440)}d`;
  };

  const nextStatus = getNextStatus(ticket.status);
  const prevStatus = getPreviousStatus(ticket.status);

  return (
    <div className={`ticket-card priority-${ticket.priority} ${ticket.slaBreached ? 'breached' : ''}`}>
      <div className="ticket-header">
        <span className={`priority-badge priority-${ticket.priority}`}>
          {ticket.priority}
        </span>
        {ticket.slaBreached && <span className="breach-badge">SLA Breached</span>}
      </div>

      <h4 className="ticket-subject">{ticket.subject}</h4>
      <p className="ticket-description">{ticket.description}</p>
      <p className="ticket-email">{ticket.customerEmail}</p>

      <div className="ticket-meta">
        <span className="ticket-age">Age: {formatAge(ticket.ageMinutes)}</span>
      </div>

      <div className="ticket-actions">
        {prevStatus && (
          <button
            className="btn btn-small btn-secondary"
            onClick={() => onUpdateStatus(ticket._id, prevStatus)}
          >
            ← Back
          </button>
        )}
        {nextStatus && (
          <button
            className="btn btn-small btn-primary"
            onClick={() => onUpdateStatus(ticket._id, nextStatus)}
          >
            {nextStatus === 'in_progress' ? 'Start' : 
             nextStatus === 'resolved' ? 'Resolve' : 'Close'} →
          </button>
        )}
        <button
          className="btn btn-small btn-danger"
          onClick={() => onDelete(ticket._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TicketCard;

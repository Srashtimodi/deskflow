import TicketCard from './TicketCard';

function TicketBoard({ tickets, onUpdateStatus, onDelete }) {
  const columns = [
    { id: 'open', title: 'Open' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'resolved', title: 'Resolved' },
    { id: 'closed', title: 'Closed' }
  ];

  const getTicketsByStatus = (status) => {
    return tickets.filter(ticket => ticket.status === status);
  };

  return (
    <div className="board">
      {columns.map(column => (
        <div key={column.id} className="column">
          <div className="column-header">
            <h3>{column.title}</h3>
            <span className="count">{getTicketsByStatus(column.id).length}</span>
          </div>
          <div className="column-content">
            {getTicketsByStatus(column.id).map(ticket => (
              <TicketCard
                key={ticket._id}
                ticket={ticket}
                onUpdateStatus={onUpdateStatus}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketBoard;

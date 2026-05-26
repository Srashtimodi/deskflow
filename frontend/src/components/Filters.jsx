function Filters({ priorityFilter, setPriorityFilter, breachedFilter, setBreachedFilter }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label>Priority:</label>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={breachedFilter}
            onChange={(e) => setBreachedFilter(e.target.checked)}
          />
          Show SLA Breached Only
        </label>
      </div>
    </div>
  );
}

export default Filters;

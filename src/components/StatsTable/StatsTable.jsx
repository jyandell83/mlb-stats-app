const StatsTable = ({ columns, rows }) => {
  if (!rows?.length) return <p>No stats available.</p>;

  return (
    <table className="stats-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={row.season ?? index}>
            {columns.map((col) => (
              <td key={col.key}>{row[col.key] ?? "-"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatsTable;

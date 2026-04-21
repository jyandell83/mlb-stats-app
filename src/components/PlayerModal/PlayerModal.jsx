export default function PlayerModal({ onClose, player }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        <h2>Player info here</h2>
        <p>{player}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

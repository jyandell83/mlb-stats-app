export default function PlayerModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        <h2>Player info here</h2>
        <p>This is a modal</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

import "./BaseDiamond.css";

const BaseDiamond = ({ bases = {}, outs = 0 }) => {
  const { first, second, third } = bases;

  return (
    <div className="base-diamond" aria-label="Base runners">
      <div
        className={`base base-second ${second ? "occupied" : ""}`}
        title="Second base"
      />
      <div
        className={`base base-third ${third ? "occupied" : ""}`}
        title="Third base"
      />
      <div
        className={`base base-first ${first ? "occupied" : ""}`}
        title="First base"
      />
      <div className="outs-container">
        <div className={`out-light ${outs >= 1 ? "active" : ""}`} />
        <div className={`out-light ${outs >= 2 ? "active" : ""}`} />
      </div>
    </div>
  );
};

export default BaseDiamond;

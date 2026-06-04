import "./PlayLog.css";

const PlayLog = ({ inningHalf, currentInning, currentHalfInningPlays }) => {
  return (
    <section className="play-log">
      <h3>Play by Play</h3>

      <div className="inning-group">
        <div className="inning-header">{`${inningHalf} of ${currentInning} `}</div>

        {currentHalfInningPlays.map((play, index) => (
          <div key={index} className="play-item">
            <span className="play-dot"></span>
            <p key={play.atBatIndex}>
              {play.result.description ?? "..."}
              {play.result.eventType === "home_run" &&
                ` ${play.playEvents.at(-1).hitData?.totalDistance} feet`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayLog;

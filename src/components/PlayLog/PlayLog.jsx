import "./PlayLog.css";
import { getPlayMarker } from "../../utils/playMarker";

const PlayLog = ({ inningHalf, currentInning, currentHalfInningPlays }) => {
  // console.table(
  //   currentHalfInningPlays.map((play) => ({
  //     event: play.result.event,
  //     eventType: play.result.eventType,
  //   })),
  // );
  // console.log(currentHalfInningPlays);
  return (
    <section className="play-log">
      <h3>Play by Play</h3>

      <div className="inning-group">
        <div className="inning-header">{`${inningHalf} of ${currentInning} `}</div>

        {currentHalfInningPlays.map((play, index) => (
          <div key={index} className="play-item">
            <span className="play-dot">{getPlayMarker(play)}</span>
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

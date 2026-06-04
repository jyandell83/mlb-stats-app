const PlayLog = ({ inningHalf, currentInning, currentHalfInningPlays }) => {
  return (
    <div>
      {`${inningHalf} of ${currentInning} `}
      <ul className="play-feed">
        {currentHalfInningPlays.map((play) => (
          <li key={play.atBatIndex}>{play.result.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayLog;

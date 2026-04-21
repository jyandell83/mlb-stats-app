export default function GameDetail({ selectedGamePk, gameDetails }) {
  return (
    <div>
      {selectedGamePk && gameDetails && (
        <div className="details">
          <div>
            {selectedGamePk}
            {gameDetails.liveData.linescore.outs}
            {gameDetails.liveData.linescore.inningState}{" "}
            {gameDetails.liveData.linescore.currentInning}
          </div>

          <div className="flex flex-col">
            <div>
              {gameDetails.liveData.plays.currentPlay?.result?.description ??
                "No play yet"}
            </div>
            <div>{`${gameDetails.liveData.linescore.outs} Out`}</div>
            <div>
              Count:{" "}
              {`${gameDetails.liveData.linescore.balls} - ${gameDetails.liveData.linescore.strikes}`}
            </div>

            <div>{`P ${gameDetails.liveData.linescore.defense.pitcher.fullName}`}</div>
            <div>{`${gameDetails.liveData.linescore.offense.batter.fullName} at Bat`}</div>
          </div>
        </div>
      )}
    </div>
  );
}

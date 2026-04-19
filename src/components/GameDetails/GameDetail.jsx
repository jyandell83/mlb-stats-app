export default function GameDetail({ selectedGamePk, gameDetails }) {
  return (
    <div>
      {selectedGamePk && gameDetails && (
        <div className="details">
          <div>
            {selectedGamePk}
            {gameDetails.liveData.linescore.inningState}{" "}
            {gameDetails.liveData.linescore.currentInning}
          </div>

          <div>
            {gameDetails.liveData.plays.currentPlay?.result?.description ??
              "No play yet"}
          </div>
        </div>
      )}
    </div>
  );
}

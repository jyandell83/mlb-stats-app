export default function GameDetail({
  selectedGamePk,
  gameDetails,
  handlePlayerClick,
}) {
  console.log(gameDetails);
  return (
    <div>
      {selectedGamePk && gameDetails && (
        <div className="details">
          <div>
            {/* {selectedGamePk} uncomment to troubleshoot gamepk*/}
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
            <div>
              <div>
                <div>On the mound</div>
                <button
                  className="text-button"
                  onClick={() =>
                    handlePlayerClick(
                      gameDetails.liveData.linescore.defense.pitcher.fullName,
                      gameDetails.liveData.linescore.defense.pitcher.id,
                    )
                  }
                >
                  {gameDetails.liveData.linescore.defense.pitcher.fullName}
                </button>
                P: *Pitch count*
              </div>
            </div>
            <div>
              <div>At Bat</div>
              <span>
                {`${gameDetails.liveData.linescore.offense.battingOrder}: `}
              </span>
              <button
                className="text-button"
                onClick={() =>
                  handlePlayerClick(
                    gameDetails.liveData.linescore.offense.batter.fullName,
                    gameDetails.liveData.linescore.offense.batter.id,
                  )
                }
              >
                {gameDetails.liveData.linescore.offense.batter.fullName}
              </button>
            </div>
            <div>
              <h3>Top Performers</h3>
              {gameDetails.liveData.boxscore.topPerformers.map(
                (topPerformer) => {
                  return (
                    <div>
                      <h4>{topPerformer.player.person.fullName}</h4>
                      {topPerformer.type == "hitter"
                        ? topPerformer.player.stats.batting.summary
                        : topPerformer.player.stats.pitching.summary}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

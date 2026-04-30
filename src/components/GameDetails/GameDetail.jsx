export default function GameDetail({
  selectedGamePk,
  gameDetails,
  handlePlayerClick,
}) {
  return (
    <div>
      {selectedGamePk && gameDetails && (
        <div>
          <div>
            {gameDetails.liveData.plays.currentPlay?.result?.description ??
              "No play yet"}
          </div>
          <div className="details flex justify-between">
            <div>
              {/* {selectedGamePk} uncomment to troubleshoot gamepk*/}
              <div>{`${gameDetails.liveData.linescore.outs} Out`}</div>
              <div>
                Count:{" "}
                {`${gameDetails.liveData.linescore.balls} - ${gameDetails.liveData.linescore.strikes}`}
              </div>
            </div>

            <div className="flex justify-evenly">
              <div>
                <div>
                  <div>On the mound</div>
                  <button
                    className="text-button"
                    onClick={() =>
                      handlePlayerClick(
                        gameDetails.liveData.linescore.defense.pitcher
                          ?.fullName,
                        gameDetails.liveData.linescore.defense.pitcher?.id,
                      )
                    }
                  >
                    {gameDetails.liveData.linescore.defense.pitcher?.fullName}
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
                      gameDetails.liveData.linescore.offense.batter?.fullName,
                      gameDetails.liveData.linescore.offense.batter?.id,
                    )
                  }
                >
                  {gameDetails.liveData.linescore.offense.batter?.fullName}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <h3>Top Performers</h3>
              {gameDetails.liveData.boxscore.topPerformers?.map(
                (topPerformer) => {
                  return (
                    <div>
                      <span>{topPerformer.player.person.fullName}</span>
                      {topPerformer.type === "hitter"
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

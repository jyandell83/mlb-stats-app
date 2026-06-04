import BaseDiamond from "../BaseDiamond/BaseDiamond.jsx";
import PlayLog from "../PlayLog/PlayLog.jsx";

export default function GameDetail({
  selectedGamePk,
  gameDetails,
  handlePlayerClick,
}) {
  const currentInning = gameDetails.liveData.linescore.currentInning;

  const inningHalf = gameDetails.liveData.linescore.inningHalf.toLowerCase();

  const inningData =
    gameDetails.liveData.plays.playsByInning[currentInning - 1];

  const playIndexes = inningData?.[inningHalf] || [];

  const currentHalfInningPlays = playIndexes.map(
    (index) => gameDetails.liveData.plays.allPlays[index],
  );

  return (
    <div>
      {selectedGamePk && gameDetails && (
        <div>
          <PlayLog
            inningHalf={inningHalf}
            currentInning={currentInning}
            currentHalfInningPlays={currentHalfInningPlays}
          />

          <div className="details flex justify-evenly">
            <div>
              <BaseDiamond
                bases={{
                  first: gameDetails?.liveData?.linescore?.offense?.first,
                  second: gameDetails?.liveData?.linescore?.offense?.second,
                  third: gameDetails?.liveData?.linescore?.offense?.third,
                }}
                outs={gameDetails.liveData.linescore.outs}
              />
              <div>
                Count:{" "}
                {`${gameDetails.liveData.linescore.balls} - ${gameDetails.liveData.linescore.strikes}`}
              </div>
            </div>

            <div className="flex justify-evenly flex-col">
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
                  {/* <span> P: *Pitch count*</span> */}
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
                      <span>{`${topPerformer.player.person.fullName} `}</span>
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

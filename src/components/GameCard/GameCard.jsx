import { useEffect, useState } from "react";

import { getLiveGameFeed } from "./../../api/mlbApi.js";

import GameHeader from "../GameHeader/GameHeader";
import InningTable from "../InningTable/IninngTable";
import GameDetail from "../GameDetails/GameDetail";

const GameCard = ({ game, innings, handlePlayerClick }) => {
  const [gameDetails, setGameDetails] = useState(null);
  const gamePk = game.gamePk;
  const state = gameDetails?.gameData?.status?.abstractGameState;

  const showDetails = state === "Live" || state === "Final";

  useEffect(() => {
    if (state !== "Live") return;
    const fetchDetails = () => {
      fetch(getLiveGameFeed(gamePk))
        .then((res) => res.json())
        .then(setGameDetails);
    };

    fetchDetails();
    const interval = setInterval(fetchDetails, 15000);

    return () => clearInterval(interval);
  }, [gamePk, state]);

  return (
    <>
      <GameHeader game={game} />

      {showDetails && (
        <>
          <InningTable
            innings={innings}
            game={game}
            gameDetails={gameDetails}
          />

          <GameDetail
            selectedGamePk={game.gamePk}
            gameDetails={gameDetails}
            handlePlayerClick={handlePlayerClick}
          />
        </>
      )}
    </>
  );
};

export default GameCard;

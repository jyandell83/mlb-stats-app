import { useEffect, useState } from "react";

import { getLiveGameFeed } from "./../../api/mlbApi.js";

import GameHeader from "../GameHeader/GameHeader";
import InningTable from "../InningTable/IninngTable";
import GameDetail from "../GameDetails/GameDetail";

const GameCard = ({ game, innings, handlePlayerClick }) => {
  const [gameDetails, setGameDetails] = useState(null);
  const gamePk = game.gamePk;

  useEffect(() => {
    const fetchDetails = () => {
      fetch(getLiveGameFeed(gamePk))
        .then((res) => res.json())
        .then(setGameDetails);
    };

    fetchDetails();
    const interval = setInterval(fetchDetails, 15000);

    return () => clearInterval(interval);
  }, [gamePk]);

  return (
    <>
      <GameHeader game={game} />

      <InningTable innings={innings} game={game} />

      <GameDetail
        selectedGamePk={game.gamePk}
        gameDetails={gameDetails}
        handlePlayerClick={handlePlayerClick}
      />
    </>
  );
};

export default GameCard;

import { useEffect, useState } from "react";

import { getLiveGameFeed } from "./../../api/mlbApi.js";

import GameHeader from "../GameHeader/GameHeader";
import InningTable from "../InningTable/InningTable";
import GameDetail from "../GameDetails/GameDetail";

const GameCard = ({ game, innings, handlePlayerClick }) => {
  const [gameDetails, setGameDetails] = useState(null);
  const [showLiveFeed, setShowLiveFeed] = useState(false);
  const [showRecap, setShowRecap] = useState(false);

  const gamePk = game.gamePk;
  const state = gameDetails?.gameData?.status?.abstractGameState;

  const showDetails = state === "Live";
  const showRecapButton = state === "Final";

  const handleShowDetailsClick = () => {
    setShowLiveFeed(!showLiveFeed);
  };

  const handleShowRecapClick = () => {
    setShowRecap(!showRecap);
  };

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

      <div className=" flex justify-flex-end">
        {showDetails && (
          <button
            onClick={() => handleShowDetailsClick()}
            className="text-button"
          >
            {showLiveFeed ? "Hide " : "Show "} Details
          </button>
        )}
        {showRecapButton && (
          <button
            className="text-button"
            onClick={() => handleShowRecapClick()}
          >
            {showRecap ? "Hide " : "Show "} Recap
          </button>
        )}
      </div>

      {showLiveFeed && (
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

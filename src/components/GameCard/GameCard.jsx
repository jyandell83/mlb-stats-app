import { useEffect, useState } from "react";

import { getLiveGameFeed } from "./../../api/mlbApi.js";

import GameHeader from "../GameHeader/GameHeader";
import InningTable from "../InningTable/InningTable";
import GameDetail from "../GameDetails/GameDetail";
import BoxScore from "../BoxScore/BoxScore";

const GameCard = ({ game, innings, handlePlayerClick }) => {
  const [gameDetails, setGameDetails] = useState(null);
  const [showLiveFeed, setShowLiveFeed] = useState(false);
  const [showRecap, setShowRecap] = useState(false);

  const gamePk = game.gamePk;
  const state = gameDetails?.gameData?.status?.abstractGameState;

  const showLiveFeedButton = state === "Live";
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
        {showLiveFeedButton && (
          <button
            onClick={() => handleShowDetailsClick()}
            className="text-button"
          >
            {showLiveFeed ? "Hide " : "Show "} Live Feed
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

      {showRecap && (
        <>
          <InningTable
            innings={innings}
            game={game}
            gameDetails={gameDetails}
          />
          <BoxScore
            gamePk={game.gamePk}
            handlePlayerClick={handlePlayerClick}
          />
        </>
      )}
    </>
  );
};

export default GameCard;

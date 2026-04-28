import GameCard from "../GameCard/GameCard";

export default function GameList({
  games,
  setSelectedGamePk,
  selectedGamePk,
  handlePlayerClick,
}) {
  return (
    <ul className="gameList">
      {games.map((game) => {
        const numInnings = Math.max(game.linescore?.innings.length || 0, 9);
        const innings = Array.from({ length: numInnings }, (_, i) => {
          return game.linescore?.innings?.[i] || {};
        });

        return (
          <li
            key={game.gamePk}
            className={`gameCard ${
              selectedGamePk === game.gamePk ? "highlight" : ""
            }`}
            onClick={() => {
              setSelectedGamePk(game.gamePk);
            }}
          >
            <GameCard
              game={game}
              innings={innings}
              handlePlayerClick={handlePlayerClick}
            />
          </li>
        );
      })}
    </ul>
  );
}

import { useState } from "react";

import GameCard from "../GameCard/GameCard";

export default function GameList({
  games,
  setSelectedGamePk,
  selectedGamePk,
  handlePlayerClick,
}) {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const teamNames = [
    ...new Set(
      games.flatMap((game) => [
        game.teams.away.team.name,
        game.teams.home.team.name,
      ]),
    ),
  ].sort();

  const filteredGames =
    selectedTeams.length === 0
      ? games
      : games.filter((game) => {
          const home = game.teams.home.team.name;
          const away = game.teams.away.team.name;

          return selectedTeams.includes(home) || selectedTeams.includes(away);
        });

  const handleTeamChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setSelectedTeams(values);
  };

  return (
    <>
      <label htmlFor="teamFilter">Filter by team</label>

      <select
        id="teamFilter"
        multiple
        value={selectedTeams}
        onChange={handleTeamChange}
      >
        {teamNames.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>
      <ul className="gameList">
        {filteredGames.map((game) => {
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
    </>
  );
}

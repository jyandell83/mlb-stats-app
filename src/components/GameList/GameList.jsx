import { useState } from "react";

import GameCard from "../GameCard/GameCard";

export default function GameList({
  games,
  setSelectedGamePk,
  selectedGamePk,
  handlePlayerClick,
}) {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const divisionNames = [
    ...new Set(
      games.flatMap((game) => [
        game.teams.away.team.division?.name,
        game.teams.home.team.division?.name,
      ]),
    ),
  ].sort();

  const teamNames = [
    ...new Set(
      games.flatMap((game) => [
        game.teams.away.team.name,
        game.teams.home.team.name,
      ]),
    ),
  ].sort();

  console.log(games);

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
      <div className="team-filter">
        <div className="team-filter-group">
          <div>
            <label htmlFor="teamFilter">Filter by team</label>

            <p className="filter-hint">Hold Ctrl/Cmd to select multiple</p>
          </div>

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
        </div>

        <div className="team-filter-group">
          <div>
            <label htmlFor="teamFilter">Filter by Division</label>

            <p className="filter-hint">Hold Ctrl/Cmd to select multiple</p>
          </div>

          <select id="divisionFilter" multiple value="" onChange="">
            {divisionNames.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn"
          type="button"
          onClick={() => setSelectedTeams([])}
        >
          Reset Filter
        </button>
      </div>

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

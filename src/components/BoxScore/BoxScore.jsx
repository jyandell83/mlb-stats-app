import { useEffect, useState } from "react";

import { getBoxscore } from "../../api/mlbApi";

const BoxScore = ({ gamePk }) => {
  const [boxScore, setBoxScore] = useState(null);
  useEffect(() => {
    const fetchBoxscore = async () => {
      try {
        const response = await fetch(getBoxscore(gamePk));

        const data = await response.json();

        setBoxScore(data);
      } catch (error) {
        console.error("Error fetching boxscore:", error);
      }
    };

    fetchBoxscore();
  }, [gamePk]);

  const awayLineup = Object.values(boxScore?.teams?.away?.players || {})
    .filter((player) => player.battingOrder)
    .sort((a, b) => Number(a.battingOrder) - Number(b.battingOrder));

  const homeLineup = Object.values(boxScore?.teams?.home?.players || {})
    .filter((player) => player.battingOrder)
    .sort((a, b) => Number(a.battingOrder) - Number(b.battingOrder));

  return (
    <div className="flex justify-evenly">
      <div>
        <div>{boxScore?.teams?.away.team.name}</div>
        {awayLineup.map((player) => (
          <div key={player.person.id}>{player.person.fullName}</div>
        ))}
      </div>

      <div>
        <div>{boxScore?.teams?.home.team.name}</div>
        {homeLineup.map((player) => (
          <div key={player.person.id}>{player.person.fullName}</div>
        ))}
      </div>
    </div>
  );
};

export default BoxScore;

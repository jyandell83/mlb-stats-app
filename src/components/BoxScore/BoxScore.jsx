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

  return (
    <div>
      {boxScore?.teams?.away.team.name}
      {gamePk}
    </div>
  );
};

export default BoxScore;

import { useEffect, useState } from "react";

import { getLeagueLeaders } from "../../api/mlbApi";

import StatsTable from "../StatsTable/StatsTable";

const LeagueLeaderCard = ({ title, category, statGroup, range }) => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch(
          getLeagueLeaders({
            category,
            statGroup,
            range,
          }),
        );

        const data = await res.json();

        const formattedLeaders =
          data?.leagueLeaders?.[0]?.leaders?.map((leader, index) => ({
            rank: index + 1,
            player: leader?.person?.fullName,
            team: leader.team?.name,
            value: leader?.value,
          })) ?? [];

        setLeaders(formattedLeaders);
      } catch (err) {
        console.error("Failed to fetch league leaders:", err);
      }
    };

    fetchLeaders();
  }, [category, statGroup, range]);

  const columns = [
    { label: "#", key: "rank" },
    { label: "Player", key: "player" },
    { label: "Team", key: "team" },
    { label: title, key: "value" },
  ];
  return (
    <section className="leader-card card">
      <h3>{title}</h3>

      <StatsTable columns={columns} rows={leaders} />
    </section>
  );
};

export default LeagueLeaderCard;

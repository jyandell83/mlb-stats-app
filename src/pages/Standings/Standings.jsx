import { useEffect, useState } from "react";

import { getStandings } from "../../api/mlbApi";

import LeagueStandings from "./LeagueStandings";
import DivisionStandings from "./DivisionStandings";
import Tabs from "../../components/Tabs/Tabs";
import Header from "../../components/Header/Header";

const Standings = () => {
  const [standings, setStandings] = useState(null);

  const [activeTab, setActiveTab] = useState("divisions");
  const standingsTabs = [
    { id: "divisions", label: "By Division" },
    { id: "leagues", label: "By League" },
  ];

  const divisionColumns = [
    { label: "Team", key: "team" },
    { label: "W", key: "wins" },
    { label: "L", key: "losses" },
    { label: "PCT", key: "pct" },
    { label: "GB", key: "gamesBack" },
    { label: "L10", key: "lastTen" },
    { label: "STRK", key: "streak" },
  ];

  const leagueColumns = [
    { label: "Team", key: "team" },
    { label: "W", key: "wins" },
    { label: "L", key: "losses" },
    { label: "PCT", key: "pct" },
    { label: "GB", key: "gamesBack" },
    { label: "WCGB", key: "wildCardGamesBack" },
    { label: "L10", key: "lastTen" },
    { label: "STRK", key: "streak" },
  ];

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch(getStandings());
        const data = await res.json();

        setStandings(data);
      } catch (err) {
        console.error("Failed to fetch standings:", err);
      }
    };

    fetchStandings();
  }, []);

  return (
    <>
      <Header text="Standings" />
      <Tabs
        tabs={standingsTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTab === "divisions" && (
        <DivisionStandings standings={standings} columns={divisionColumns} />
      )}
      {activeTab === "leagues" && (
        <LeagueStandings standings={standings} columns={leagueColumns} />
      )}
    </>
  );
};

export default Standings;

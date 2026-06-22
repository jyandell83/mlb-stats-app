import StatsTable from "../StatsTable/StatsTable";

const SeasonStatsPlayer = ({ isPitcher, splits }) => {
  return (
    <div className="stats-table-scroll">
      {isPitcher ? (
        <div className="pitcher-stats">
          <h3>Pitching Stats</h3>
          <StatsTable
            columns={[
              { label: "Year", key: "season" },
              { label: "Team", key: "team" },
              { label: "W", key: "wins" },
              { label: "L", key: "losses" },
              { label: "ERA", key: "era" },
              { label: "G", key: "gamesPitched" },
              { label: "GS", key: "gamesStarted" },
              { label: "SV", key: "saves" },
              { label: "IP", key: "inningsPitched" },
              { label: "H", key: "hits" },
              { label: "R", key: "runs" },
              { label: "ER", key: "earnedRuns" },
              { label: "BB", key: "baseOnBalls" },
              { label: "SO", key: "strikeOuts" },
              { label: "WHIP", key: "whip" },
            ]}
            rows={splits.map((split) => ({
              team: split?.team?.name,
              season: split?.season,
              wins: split?.stat?.wins,
              losses: split?.stat?.losses,
              era: split?.stat?.era,
              gamesPitched: split?.stat?.gamesPitched,
              gamesStarted: split?.stat?.gamesStarted,
              saves: split?.stat?.saves,
              inningsPitched: split?.stat?.inningsPitched,
              hits: split?.stat?.hits,
              runs: split?.stat?.runs,
              earnedRuns: split?.stat?.earnedRuns,
              baseOnBalls: split?.stat?.baseOnBalls,
              strikeOuts: split?.stat?.strikeOuts,
              whip: split?.stat?.whip,
            }))}
          />
        </div>
      ) : (
        <StatsTable
          columns={[
            { label: "Year", key: "season" },
            { label: "Team", key: "team" },
            { label: "AVG", key: "avg" },
            { label: "G", key: "gamesPlayed" },
            { label: "AB", key: "atBats" },
            { label: "R", key: "runs" },
            { label: "H", key: "hits" },
            { label: "2B", key: "doubles" },
            { label: "3B", key: "triples" },
            { label: "HR", key: "homeRuns" },
            { label: "RBI", key: "rbi" },
            { label: "BB", key: "baseOnBalls" },
            { label: "SO", key: "strikeOuts" },
            { label: "SB", key: "stolenBases" },
            { label: "OBP", key: "obp" },
            { label: "SLG", key: "slg" },
            { label: "OPS", key: "ops" },
          ]}
          rows={splits.map((split) => ({
            team: split?.team?.name,
            season: split?.season,
            avg: split?.stat?.avg,
            gamesPlayed: split?.stat?.gamesPlayed,
            atBats: split?.stat?.atBats,
            runs: split?.stat?.runs,
            hits: split?.stat?.hits,
            doubles: split?.stat?.doubles,
            triples: split?.stat?.triples,
            homeRuns: split?.stat?.homeRuns,
            rbi: split?.stat?.rbi,
            baseOnBalls: split?.stat?.baseOnBalls,
            strikeOuts: split?.stat?.strikeOuts,
            stolenBases: split?.stat?.stolenBases,
            obp: split?.stat?.obp,
            slg: split?.stat?.slg,
            ops: split?.stat?.ops,
          }))}
        />
      )}
    </div>
  );
};

export default SeasonStatsPlayer;

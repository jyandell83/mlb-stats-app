const GAME_TAGS = {
  divisionGame: {
    label: "Division Game",
    icon: "🔥",
    className: "tag-division-game",
  },

  interleague: {
    label: "Interleague",
    icon: "🤝",
    className: "tag-interleague",
  },

  doubleheader: {
    label: "Doubleheader",
    icon: "👯",
    className: "tag-doubleheader",
  },
};

export function getGameTags(game) {
  const tags = [];

  const awayLeagueId = game.teams.away.team.league?.id;

  const homeLeagueId = game.teams.home.team.league?.id;

  const awayDivisionId = game.teams.away.team.division?.id;

  const homeDivisionId = game.teams.home.team.division?.id;

  if (awayDivisionId === homeDivisionId) {
    tags.push(GAME_TAGS.divisionGame);
  }

  if (awayLeagueId !== homeLeagueId) {
    tags.push(GAME_TAGS.interleague);
  }

  if (game.doubleHeader !== "N") {
    tags.push(GAME_TAGS.doubleheader);
  }

  return tags;
}

const GAME_VIBES = {
  nailBiter: {
    label: "Nail-biter",
    icon: "😬",
    className: "vibe-nail-biter",
  },
  pitchersDuel: {
    label: "Pitcher's Duel",
    icon: "⚔️",
    className: "vibe-pitchers-duel",
  },
  slugfest: {
    label: "Slugfest",
    icon: "🎆",
    className: "vibe-slugfest",
  },
  blowout: {
    label: "Blowout",
    icon: "💥",
    className: "vibe-blowout",
  },
};

export function getGameVibe({ awayRuns = 0, homeRuns = 0, inning = 0 }) {
  const totalRuns = awayRuns + homeRuns;
  const runDiff = Math.abs(awayRuns - homeRuns);

  if (inning >= 7 && runDiff <= 1) {
    return GAME_VIBES.nailBiter;
  }

  if (inning >= 5 && totalRuns <= 3 && runDiff <= 2) {
    return GAME_VIBES.pitchersDuel;
  }

  if (inning >= 5 && runDiff >= 7) {
    return GAME_VIBES.blowout;
  }

  if (inning >= 4 && totalRuns >= 8 && awayRuns > 0 && homeRuns > 0) {
    return GAME_VIBES.slugfest;
  }

  return null;
}

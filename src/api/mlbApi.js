// Base URL for MLB Stats API
const BASE_URL = "https://statsapi.mlb.com/api/v1";
const LIVE_BASE_URL = "https://statsapi.mlb.com/api/v1.1";

const today = new Date();
// const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
const formattedDate = today.toLocaleDateString("en-CA");
// const formattedDate = "2026-04-24";

/**
 *  Get schedule + basic game data for a specific date
 * - Includes teams, score, inning, game status
 * - Use for main game list / scoreboard
 */

export const getSchedule = (date) =>
  `${BASE_URL}/schedule?sportId=1&date=${formattedDate}&hydrate=linescore`;

/**
 *  Get full live game data (VERY detailed)
 * - Pitch-by-pitch
 * - Balls, strikes, outs
 * - Runners on base
 * - Batter / pitcher info
 * - Use ONLY when a game is expanded
 */
export const getLiveGameFeed = (gamePk) =>
  `${LIVE_BASE_URL}/game/${gamePk}/feed/live`;

/**--------------------------untested below ---------------------------------- */
/**
 * Get boxscore for a game
 * - Lineups
 * - Batting + pitching stats
 * - Substitutions
 * - Good for expanded game view
 */
export const getBoxscore = (gamePk) => `${BASE_URL}/game/${gamePk}/boxscore`;

/**
 *  Get linescore for a game (lighter than live feed)
 * - Inning-by-inning scoring
 * - Count (balls/strikes/outs)
 * - Good alternative to live feed if you want less data
 */
export const getLinescore = (gamePk) => `${BASE_URL}/game/${gamePk}/linescore`;

/**
 *  Get player season stats
 * - Batting avg, HR, RBI, ERA, etc.
 */
export const getPlayerStats = (playerId) =>
  `${BASE_URL}/people/${playerId}/stats?stats=season`;

/**
 *  Get team roster
 * - List of players on a team
 * - Useful for lineups or player lookup
 */
export const getTeamRoster = (teamId) => `${BASE_URL}/teams/${teamId}/roster`;

/**
 *  Get team stats
 * - Overall team performance stats
 */
export const getTeamStats = (teamId) => `${BASE_URL}/teams/${teamId}/stats`;

/**
 * Get league standings
 * - Divisions, wins/losses, rankings
 */
export const getStandings = () => `${BASE_URL}/standings`;

/**
 *  Get all MLB teams
 * - Team IDs, names, abbreviations
 */
export const getTeams = () => `${BASE_URL}/teams`;

/**
 * 🎥 Get game content
 * - Highlights, recap videos, editorial content
 */
export const getGameContent = (gamePk) => `${BASE_URL}/game/${gamePk}/content`;

/**
 *  Get schedule with probable pitchers
 * - Adds starting pitcher info to schedule
 */
export const getScheduleWithPitchers = (date) =>
  `${BASE_URL}/schedule?date=${date}&hydrate=probablePitcher`;

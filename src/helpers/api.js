import leagueData from './league-data.json';
const LEAGUE_NAME = 'Fantersee Furtbull'

export const fetchLeagueData = (setLeagueName, setCurrentWeek,setTeams, setMatchups) => {
  // map data to our structure
  setLeagueName(LEAGUE_NAME);
  setCurrentWeek(leagueData.scoringPeriodId);
  setTeams(getTeamDataForResponse(leagueData.teams));
  setMatchups(getMatchupDataForResponse(leagueData.schedule));
};

const getTeamDataForResponse = (teams) => {
  const teamData = teams.map((team) => ({
    id: team.id,
    name: team.name,
    totalPoints: team.points,
    wins: team.record.wins,
    losses: team.record.overall.losses,
    ties: team.record.overall.ties,
  }));

  return teamData;
};

const getMatchupDataForResponse = (schedule) => {
  const matchupData = schedule.map((matchup) => ({
    week: matchup.matchupPeriodId,
    homeId: matchup.home.teamId,
    awayId: matchup.away.teamId,
    homeScore: matchup.home.totalPoints,
    awayScore: matchup.away.totalPoints,
    winnerId: matchup.home.totalPoints > matchup.away.totalPoints ? matchup.home.teamId : (matchup.home.totalPoints < matchup.away.totalPoints ? matchup.away.teamId : null),
  }));

  return matchupData;
};

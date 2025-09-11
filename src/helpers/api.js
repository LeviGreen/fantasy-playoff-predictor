import leagueData from './leagueData.json';

export const fetchLeagueData = (setTeams, setMatchups) => {
  // map data to our structure
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

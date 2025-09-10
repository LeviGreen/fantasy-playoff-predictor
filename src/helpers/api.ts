const mockTeamData = [
    { id: 1, name: 'Team A', wins: 2, losses: 1, totalPoints: 1500 },
    { id: 2, name: 'Team B', wins: 1, losses: 2, totalPoints: 1400 },
    { id: 3, name: 'Team C', wins: 2, losses: 1, totalPoints: 1600 },
    { id: 4, name: 'Team D', wins: 2, losses: 1, totalPoints: 1200 },
    { id: 5, name: 'Team E', wins: 2, losses: 1, totalPoints: 1450 },
    { id: 6, name: 'Team F', wins: 1, losses: 2, totalPoints: 1300 },
    { id: 7, name: 'Team G', wins: 2, losses: 1, totalPoints: 1550 },
    { id: 8, name: 'Team H', wins: 0, losses: 3, totalPoints: 1100 },
];

const mockMatchupData = [
    { week: 1, homeId: 1, awayId: 2, homeScore: 100, awayScore: 90, winnerId: 1 },
    { week: 1, homeId: 3, awayId: 4, homeScore: 110, awayScore: 95, winnerId: 3 },
    { week: 1, homeId: 5, awayId: 6, homeScore: 105, awayScore: 100, winnerId: 5 },
    { week: 1, homeId: 7, awayId: 8, homeScore: 115, awayScore: 85, winnerId: 7 },
    { week: 2, homeId: 1, awayId: 3, homeScore: 120, awayScore: 110, winnerId: 1 },
    { week: 2, homeId: 2, awayId: 4, homeScore: 95, awayScore: 100, winnerId: 4 },
    { week: 2, homeId: 5, awayId: 7, homeScore: 130, awayScore: 125, winnerId: 5 },
    { week: 2, homeId: 6, awayId: 8, homeScore: 90, awayScore: 80, winnerId: 6 },
    { week: 3, homeId: 1, awayId: 4, homeScore: 110, awayScore: 105, winnerId: 4 },
    { week: 3, homeId: 2, awayId: 5, homeScore: 100, awayScore: 95, winnerId: 2 },
    { week: 3, homeId: 3, awayId: 6, homeScore: 115, awayScore: 110, winnerId: 3 },
    { week: 3, homeId: 7, awayId: 8, homeScore: 120, awayScore: 100, winnerId: 7 },
    { week: 4, homeId: 1, awayId: 5, homeScore: null, awayScore: null, winnerId: null },
    { week: 4, homeId: 2, awayId: 6, homeScore: null, awayScore: null, winnerId: null },
    { week: 4, homeId: 3, awayId: 7, homeScore: null, awayScore: null, winnerId: null },
    { week: 4, homeId: 4, awayId: 8, homeScore: null, awayScore: null, winnerId: null },
];

export const fetchLeagueData = async (leagueId, setTeams, setMatchups) => {
  try {
    const currentYear = new Date().getFullYear();
    const response = await fetch(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${currentYear}/segments/0/leagues/${leagueId}?view=mBoxscore&view=mTeam`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': 'SWID={BA30DB82-F936-47A5-A2F3-30C6586F8FEB}; espn_s2={AECGbSje8sUnWLLI5FXPqKBuqI5H4MdB0rij1uAy3fGdbc5O07dIcYbExgGw%2FbOF5BFSJMY3dk47ghOjseeDuKWVFEVQDKJl%2Fkbw6iGFd2d1Gdv%2F6IpjybG6X2x5bGbhjPKg9PnvoKgiwf6JvEr2%2FkL%2FCOckvcxmq2f1BzSUi7Z%2F3sesFgPBvfv4aBImfMlnYj0Z2x0G1wuyCGJ0ETByrGOCt1jfqQ75vc%2FC0O%2Bb3OYXuLLpw06xv9nQs9f%2FjEZl%2Bdmq4PjRaqPyaeNrTJ0CRIEKBvD05X2RlP%2B3co%2Bw9Fuobw%3D%3D}'
      }
    });
    const data = await response.json();
    setTeams(getTeamDataForResponse(data.teams));
    setMatchups(getMatchupDataForResponse(data.schedule));
  } catch (error) {
    console.error('Error fetching league data:', error);
  }
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

/*
curl -X GET "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2025/segments/0/leagues/1085647814?view=mBoxscore&view=mTeam" \
   -H "Accept: application/json" \
   -H "Cookie: SWID={BA30DB82-F936-47A5-A2F3-30C6586F8FEB}; espn_s2={AECGbSje8sUnWLLI5FXPqKBuqI5H4MdB0rij1uAy3fGdbc5O07dIcYbExgGw%2FbOF5BFSJMY3dk47ghOjseeDuKWVFEVQDKJl%2Fkbw6iGFd2d1Gdv%2F6IpjybG6X2x5bGbhjPKg9PnvoKgiwf6JvEr2%2FkL%2FCOckvcxmq2f1BzSUi7Z%2F3sesFgPBvfv4aBImfMlnYj0Z2x0G1wuyCGJ0ETByrGOCt1jfqQ75vc%2FC0O%2Bb3OYXuLLpw06xv9nQs9f%2FjEZl%2Bdmq4PjRaqPyaeNrTJ0CRIEKBvD05X2RlP%2B3co%2Bw9Fuobw%3D%3D}"
*/
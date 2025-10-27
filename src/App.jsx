import { useState, useEffect } from 'react'
import './App.css'
import { fetchLeagueData } from './helpers/api.js'
import Matchups from './components/Matchups'
import Standings from './components/Standings'

function App() {
	const [leagueName, setLeagueName] = useState(null);
	const [currentWeek, setCurrentWeek] = useState(null);
	const [teams, setTeams] = useState(null);
	const [matchups, setMatchups] = useState(null);
	const [rankedTeams, setRankedTeams] = useState([]);

	const updateTeamRecords = () => {
		//reset team records
		teams.forEach(team => {
			team.wins = 0;
			team.losses = 0;
			team.ties = 0;
			team.totalPoints = 0;
		});

		//update team records based on matchups
		matchups.forEach(matchup => {
			const homeTeam = teams.find(team => team.id === matchup.homeId);
			const awayTeam = teams.find(team => team.id === matchup.awayId);

			if (homeTeam && awayTeam) {
				homeTeam.totalPoints += matchup.homeScore;
				awayTeam.totalPoints += matchup.awayScore;

				if (matchup.winnerId === homeTeam.id) {
					homeTeam.wins += 1;
					awayTeam.losses += 1;
				} else if (matchup.winnerId === awayTeam.id) {
					awayTeam.wins += 1;
					homeTeam.losses += 1;
				} else if (matchup.winnerId === 'tie') {
					homeTeam.ties += 1;
					awayTeam.ties += 1;
				}
			}
		});
	}

const rankTeams = () => {
	const teamRecords = teams.sort((team1, team2) => {
		// Primary tiebreaker: win percentage
		const winPct1 = team1.wins + team1.ties / 2;
		const winPct2 = team2.wins + team2.ties / 2;

		if (winPct1 !== winPct2) {
			return winPct2 - winPct1;
		}

		// If still tied — evaluate H2H validity
		const tiedTeams = teams.filter(
			t =>
				t.wins + t.ties / 2 === winPct1 // only teams with same record
		);

		const h2hIsValid = hasValidHeadToHeadGroup(tiedTeams);

		const headToHead = getHeadToHead(team1, team2);

		// Apply valid H2H if applicable
		if (h2hIsValid && headToHead.timesPlayed > 0) {
			if (headToHead.team1Wins !== headToHead.team2Wins) {
				return headToHead.team2Wins - headToHead.team1Wins;
			} else if (headToHead.team1Points !== headToHead.team2Points) {
				return headToHead.team2Points - headToHead.team1Points;
			}
		}

		// Fallback tiebreaker: total points
		return team2.totalPoints - team1.totalPoints;
	});

	setRankedTeams(teamRecords);
};

/**
 * Checks whether all teams in a tied group have played
 * each other an equal number of times.
 */
const hasValidHeadToHeadGroup = (tiedTeams) => {
	let valid = true;
	const gamesMatrix = {};

	// Build a matrix of how many times each team faced each other
	tiedTeams.forEach(teamA => {
		gamesMatrix[teamA.id] = {};
		tiedTeams.forEach(teamB => {
			if (teamA.id === teamB.id) return;
			const h2h = getHeadToHead(teamA, teamB);
			gamesMatrix[teamA.id][teamB.id] = h2h.timesPlayed;
		});
	});

	// Determine if everyone played everyone else equally
	const allCounts = [];
	tiedTeams.forEach(teamA => {
		let totalVsOthers = 0;
		Object.values(gamesMatrix[teamA.id]).forEach(count => {
			totalVsOthers += count;
		});
		allCounts.push(totalVsOthers);
	});

	// H2H is only valid if every tied team has same number of total H2H games
	const firstCount = allCounts[0];
	if (!allCounts.every(c => c === firstCount)) {
		valid = false;
	}

	return valid;
};

const getHeadToHead = (team1, team2) => {
	const headToHead = {
		timesPlayed: 0,
		team1Id: team1.id,
		team2Id: team2.id,
		team1Wins: 0,
		team2Wins: 0,
		team1Points: 0,
		team2Points: 0
	};
	matchups.forEach(matchup => {
		if (matchup.homeId === team1.id && matchup.awayId === team2.id) {
				headToHead.timesPlayed += 1;
			headToHead.team1Points += matchup.homeScore;
			headToHead.team2Points += matchup.awayScore;
				if (matchup.winnerId === team1.id) {
					headToHead.team1Wins += 1;
				} else if (matchup.winnerId === team2.id) {
					headToHead.team2Wins += 1;
				} else if (matchup.winnerId === 'tie') {
				headToHead.team1Wins += 0.5;
				headToHead.team2Wins += 0.5;
			}
		} else if (matchup.homeId === team2.id && matchup.awayId === team1.id) {
				headToHead.timesPlayed += 1;
			headToHead.team2Points += matchup.homeScore;
				headToHead.team1Points += matchup.awayScore;
				if (matchup.winnerId === team2.id) {
					headToHead.team2Wins += 1;
				} else if (matchup.winnerId === team1.id) {
					headToHead.team1Wins += 1;
				} else if (matchup.winnerId === 'tie') {
				headToHead.team1Wins += 0.5;
				headToHead.team2Wins += 0.5;
			}
		}
	});
	return headToHead;
};

	// run fetch league data on initial load
	useEffect(() => {
		fetchLeagueData(setLeagueName, setCurrentWeek, setTeams, setMatchups);
	}, [setTeams, setMatchups, setLeagueName, setCurrentWeek]);

	const onReset = () => {
		fetchLeagueData(setLeagueName, setCurrentWeek, setTeams, setMatchups);
	}

	return (
	<div>
		<h1>Fantasy Playoff Predictor</h1>
		<div>
			<button className='button-reset' onClick={onReset}>
				Reset to Current League Data
			</button>
			<h2>{leagueName} - 2025 Season</h2>
			{teams && matchups && (
				<div className='matchups-standings-container'>
					<Matchups currentWeek={currentWeek} matchups={matchups} setMatchups={setMatchups} teams={teams} updateTeamRecords={updateTeamRecords} rankTeams={rankTeams} />
					<Standings rankedTeams={rankedTeams} updateTeamRecords={updateTeamRecords} rankTeams={rankTeams} />
				</div>
			)}
		</div>
	</div>
	)
}

export default App

import { useState } from 'react'
import './App.css'
import { fetchLeagueData } from './helpers/api.js'
import Matchups from './components/Matchups'
import Standings from './components/Standings'

function App() {
	const [leagueId, setLeagueId] = useState(null);
	const [teams, setTeams] = useState(null);
	const [matchups, setMatchups] = useState(null);
	const [rankedTeams, setRankedTeams] = useState([]);

	const updateTeamRecords = () => {
	//duplicate teams array to avoid direct state mutation
	const updatedTeams = [...teams];

	//reset team records
	updatedTeams.forEach(team => {
		team.wins = 0;
		team.losses = 0;
		team.totalPoints = 0;
	});

	//update team records based on matchups
	matchups.forEach(matchup => {
		const homeTeam = updatedTeams.find(team => team.id === matchup.homeId);
		const awayTeam = updatedTeams.find(team => team.id === matchup.awayId);

		if (homeTeam && awayTeam) {
			homeTeam.totalPoints += matchup.homeScore;
			awayTeam.totalPoints += matchup.awayScore;

			if (matchup.winnerId === homeTeam.id) {
				homeTeam.wins += 1;
				awayTeam.losses += 1;
			} else if (matchup.winnerId === awayTeam.id) {
				awayTeam.wins += 1;
				homeTeam.losses += 1;
			}
		}
	});
	}

	const rankTeams = () => {
		const teamRecords = teams.sort((team1, team2) => {
			const headToHead = getHeadToHead(team1, team2);

			if (team1.wins !== team2.wins) {
				return team2.wins - team1.wins;
			}
			else if (headToHead.team1Wins !== headToHead.team2Wins) {
				return headToHead.team2Wins - headToHead.team1Wins;
			} else if (headToHead.team1Points !== headToHead.team2Points) {
				return headToHead.team2Points - headToHead.team1Points;
			}
		});
		
		setRankedTeams(teamRecords);
	}

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
				}
			} else if (matchup.homeId === team2.id && matchup.awayId === team1.id) {
				headToHead.timesPlayed += 1;
				headToHead.team2Points += matchup.homeScore;
				headToHead.team1Points += matchup.awayScore;
				if (matchup.winnerId === team2.id) {
					headToHead.team2Wins += 1;
				} else if (matchup.winnerId === team1.id) {
					headToHead.team1Wins += 1;
				}
			}
		});
		return headToHead;
	};

	const onSubmit = () => {
		setLeagueId(document.getElementById('input-league-id').value)
		fetchLeagueData(setTeams, setMatchups);
	}

	return (
	<div>
		<h1>Fantasy Playoff Predictor</h1>
		<div className="card">
		<input
			placeholder="Enter League ID"
			id='input-league-id'
		/>
		<button onClick={onSubmit}>
			Submit
		</button>
		<p>League ID: {leagueId}</p>

		{teams && matchups && (
			<div className='matchups-standings-container'>
				<Matchups currentWeek={1} matchups={matchups} setMatchups={setMatchups} teams={teams} updateTeamRecords={updateTeamRecords} rankTeams={rankTeams} />
				<div style={{ width: '20px' }}></div>
				<Standings rankedTeams={rankedTeams} updateTeamRecords={updateTeamRecords} rankTeams={rankTeams} />
			</div>
		)}
		</div>
	</div>
	)
}

export default App

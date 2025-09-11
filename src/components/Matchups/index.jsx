import { useState } from 'react'
import './index.css'

function Matchups({ currentWeek, matchups, setMatchups, teams }) {
	const [selectedWeek, setSelectedWeek] = useState(currentWeek);

	const currentMatchups = matchups.filter(m => m.week === selectedWeek);

	const predictMatchup = (matchup, predictedWinnerId) => {
		setMatchups(matchups.map(m => {
			if (m.week == matchup.week && m.awayId == matchup.awayId && m.homeId == matchup.homeId) {
				return {
					...m,
					winnerId: m.winnerId === predictedWinnerId ? null : predictedWinnerId
				};
			}
			return m;
		}));
	}

	return (
		<div>
			<h2>Matchups</h2>
			<div className='week-selector-container'>  
				<button onClick={() => setSelectedWeek(selectedWeek - 1)} disabled={selectedWeek <= 1}>&lt; Previous</button>
				<p>Week {selectedWeek}</p>
				<button onClick={() => setSelectedWeek(selectedWeek + 1)} disabled={selectedWeek >= 14}>Next &gt;</button>
			</div>

			{ currentMatchups.map((matchup, index) => (
			<div key={index} className='head-to-head-container'>
				<div className='score-box'  style={{ justifyContent: 'flex-end' }}>{matchup.awayScore}</div>
				<button
					className='team-button'
					style={{ backgroundColor: matchup.winnerId == matchup.awayId ? 'green' : 'lightgray' }}
					onClick={() => predictMatchup(matchup, matchup.awayId)}
				>
					{teams.find(team => team.id == matchup.awayId)?.name || matchup.awayId}
				</button>
				<span>vs</span>
				<button
					className='team-button'
					style={{ backgroundColor: matchup.winnerId == matchup.homeId ? 'green' : 'lightgray' }}
					onClick={() => predictMatchup(matchup, matchup.homeId)}
				>
					{teams.find(team => team.id == matchup.homeId)?.name || matchup.homeId}
				</button>
				<div className='score-box'  style={{ justifyContent: 'flex-start' }}>{matchup.homeScore}</div>
			</div>

			))}
		</div>
	);
}

export default Matchups;
import { useState } from 'react'
import './index.css'

const buttonStyles = {
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0 10px',
  width: '180px',
  height: '60px',
};

function Matchups({ currentWeek, matchups, setMatchups, teams }) {
	const [selectedWeek, setSelectedWeek] = useState(currentWeek);

	const currentMatchups = matchups.filter(m => m.week === selectedWeek);

	const predictMatchup = (matchup, predictedWinnerId) => {
		setMatchups(matchups.map(m => {
			if (m.week == matchup.week && m.awayId == matchup.awayId && m.homeId == matchup.homeId) {
				return { ...m, winnerId: predictedWinnerId };
			}
			return m;
		}));
	}

	return (
	<div>
		<h2>Matchups</h2>
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>  
			<button onClick={() => setSelectedWeek(selectedWeek - 1)} disabled={selectedWeek <= 1}>Previous Week</button>
			<div style={{ width: '20px' }}></div>
			<p>Week {selectedWeek}</p>
			<div style={{ width: '20px' }}></div>
			<button onClick={() => setSelectedWeek(selectedWeek + 1)} disabled={selectedWeek >= 14}>Next Week</button>
		</div>

		{ currentMatchups.map((matchup, index) => (
		<div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
			<div className='score-box'>{matchup.awayScore}</div>
			<button
				style={{
					backgroundColor: matchup.winnerId == matchup.awayId ? 'green' : 'lightgray',
					...buttonStyles
				}}
				onClick={() => predictMatchup(matchup, matchup.awayId)}
			>
				{teams.find(team => team.id == matchup.awayId)?.name || matchup.awayId}
			</button>
			<span style={{ margin: '0 5px' }}>vs</span>
			<button
				style={{
					backgroundColor: matchup.winnerId == matchup.homeId ? 'green' : 'lightgray',
					...buttonStyles
				}}
				onClick={() => predictMatchup(matchup, matchup.homeId)}
			>
				{teams.find(team => team.id == matchup.homeId)?.name || matchup.homeId}
			</button>
			<div className='score-box'>{matchup.homeScore}</div>
		</div>

		))}
	</div>
	);
}

export default Matchups;
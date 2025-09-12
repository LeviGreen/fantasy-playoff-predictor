import { useState } from 'react'
import './index.css'
import BackButton from '../BackButton';
import ForwardButton from '../ForwardButton';
import MatchupButton from '../MatchupButton';

const matchupSelectedStyles = {
	backgroundColor: 'green',
	color: 'white',
};
const matchupUnselectedStyles = {
	backgroundColor: 'lightgray',
	color: 'black',
};

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
				<BackButton onClick={() => setSelectedWeek(selectedWeek - 1)} disabled={selectedWeek <= 1}>Previous</BackButton>
				<h3>Week {selectedWeek}</h3>
				<ForwardButton onClick={() => setSelectedWeek(selectedWeek + 1)} disabled={selectedWeek >= 14}>Next</ForwardButton>
			</div>

			{ currentMatchups.map((matchup, index) => (
			<div key={index} className='head-to-head-container'>
				<div className='score-box'  style={{ justifyContent: 'flex-end' }}>{matchup.awayScore}</div>
				<MatchupButton
					style={matchup.winnerId == matchup.awayId ? matchupSelectedStyles : matchupUnselectedStyles}
					onClick={() => predictMatchup(matchup, matchup.awayId)}
				>
					{teams.find(team => team.id == matchup.awayId)?.name || matchup.awayId}
				</MatchupButton>
				<span>vs</span>
				<MatchupButton
					style={matchup.winnerId == matchup.homeId ? matchupSelectedStyles : matchupUnselectedStyles}
					onClick={() => predictMatchup(matchup, matchup.homeId)}
				>
					{teams.find(team => team.id == matchup.homeId)?.name || matchup.homeId}
				</MatchupButton>
				<div className='score-box'  style={{ justifyContent: 'flex-start' }}>{matchup.homeScore}</div>
			</div>

			))}
		</div>
	);
}

export default Matchups;
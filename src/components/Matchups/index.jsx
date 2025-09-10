import { useState } from 'react'

//export button stylings
const buttonStyles = {
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0 10px'
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>  
        <button onClick={() => setSelectedWeek(selectedWeek - 1)} disabled={selectedWeek <= 1}>Previous Week</button>
        <p>Week {selectedWeek}</p>
        <button onClick={() => setSelectedWeek(selectedWeek + 1)} disabled={selectedWeek >= 4}>Next Week</button>
      </div>

      { currentMatchups.map((matchup, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
          <b>{matchup.awayScore}</b>
          <button
            style={{
              backgroundColor: matchup.winnerId == matchup.awayId ? 'green' : 'lightgray',
              ...buttonStyles
            }}
            onClick={() => predictMatchup(matchup, matchup.awayId)}
          >
            {teams.find(team => team.id == matchup.awayId)?.name || matchup.awayId}
          </button>
          <span style={{ margin: '0 10px' }}>vs</span>
          <button
            style={{
              backgroundColor: matchup.winnerId == matchup.homeId ? 'green' : 'lightgray',
              ...buttonStyles
            }}
            onClick={() => predictMatchup(matchup, matchup.homeId)}
          >
            {teams.find(team => team.id == matchup.homeId)?.name || matchup.homeId}
          </button>
          <b>{matchup.homeScore}</b>
        </div>
    
      ))}
    </div>
  );
}

export default Matchups;
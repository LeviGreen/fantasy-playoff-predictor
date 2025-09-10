function Standings({rankedTeams, updateTeamRecords, rankTeams}) {
	updateTeamRecords();
	rankTeams();

	const playoffSpots = {
		1: '1 Seed (Bye)',
		2: '2 Seed (Bye)',
		3: '3 Seed',
		4: '4 Seed',
		5: '5 Seed',
		6: '6 Seed',
		7: 'Out',
		8: 'Out',
		9: 'Out',
		10: 'Out',
		11: 'Out',
		12: 'Out',
	}

	return (
		<div>
			<h2>Standings</h2>
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>Team</th>
						<th>Wins</th>
						<th>Losses</th>
						<th>Total Points</th>
						<th>Playoff Status</th>

					</tr>
				</thead>
				<tbody>
					{rankedTeams.map((team, index) => (
						<tr key={team.id}>
							<td>{index + 1}</td>
							<td>{team.name}</td>
							<td>{team.wins}</td>
							<td>{team.losses}</td>
							<td>{team.totalPoints}</td>
							<td>{playoffSpots[index + 1]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Standings

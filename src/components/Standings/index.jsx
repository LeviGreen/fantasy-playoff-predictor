function Standings({rankedTeams, updateTeamRecords, rankTeams}) {
	updateTeamRecords();
	rankTeams();

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
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Standings

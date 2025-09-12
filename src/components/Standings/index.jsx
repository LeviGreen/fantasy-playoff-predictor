function Standings({rankedTeams, updateTeamRecords, rankTeams}) {
	updateTeamRecords();
	rankTeams();

	const headerCellStyle = { padding: '4px 12px 24px 0px', fontSize: '1.17em' };
	const cellStyle = { padding: '8px 12px' };

	return (
		<div>
			<h2>Standings</h2>
			<br/>
			<table>
				<thead>
					<tr>
						<th style={headerCellStyle}>Rank</th>
						<th style={headerCellStyle}>Team</th>
						<th style={headerCellStyle}>W</th>
						<th style={headerCellStyle}>L</th>
						<th style={headerCellStyle}>Points</th>
						<th style={headerCellStyle}>Playoffs</th>

					</tr>
				</thead>
				<tbody>
					{rankedTeams.map((team, index) => (
						<tr key={team.id}>
							<td style={cellStyle}>{index + 1}</td>
							<td style={cellStyle}>{team.name}</td>
							<td style={cellStyle}>{team.wins}</td>
							<td style={cellStyle}>{team.losses}</td>
							<td style={cellStyle}>{team.totalPoints}</td>
							<td>
								{index < 6 ? (
									<span style={{ color: 'green', fontSize: '24px' }}>&#10004;</span>
								) : (
									<span style={{ color: 'red', fontSize: '24px' }}>&#10008;</span>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Standings

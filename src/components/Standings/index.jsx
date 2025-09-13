import styled from 'styled-components';

function Standings({rankedTeams, updateTeamRecords, rankTeams}) {
	const Table = styled.table`
		border-collapse: collapse;

		th {
			padding: 8px 12px;		}
		td {
			padding: 2px 12px;
			text-align: center;
		}

		thead {
			font-weight: bold;
			background-color: #333333;

			text-align: center;
		}

		tbody tr:nth-child(odd) {
			background-color: #404040;
		}
		tbody tr:nth-child(even) {
			background-color: #333333;
		}
	`;

	updateTeamRecords();
	rankTeams();

	return (
		<div>
			<h2>Standings</h2>
			<br />
			<Table>
				<thead>
					<tr>
						<th>#</th>
						<th>Team</th>
						<th>Record</th>
						<th>Points</th>
						<th>Playoffs</th>
					</tr>
				</thead>
				<tbody>
					{rankedTeams.map((team, index) => (
						<tr key={team.id}>
							<td>{index + 1}</td>
							<td>{team.name}</td>
							<td>{team.wins}-{team.losses}-{team.ties}</td>
							<td>{team.totalPoints}</td>
							<td>
								{index < 6 ? (
									<span style={{ color: 'green', fontSize: '24px' }}>&#x2705;</span>
								) : (
									<span style={{ color: 'red', fontSize: '24px' }}>&#10060;</span>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Standings

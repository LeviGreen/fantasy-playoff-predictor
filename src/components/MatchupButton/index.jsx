import './index.css'

function MatchupButton({ style, onClick, children }) {
	return (
		<button
			className='button-matchup'
			style={style}
			onClick={onClick}
		>	
			{children}
		</button>
	);
}

export default MatchupButton;

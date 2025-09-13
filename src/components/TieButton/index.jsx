import './index.css'

function TieButton({ style, onClick }) {
	return (
		<button
			className='button-tie'
			style={style}
			onClick={onClick}
		>	
			Tie
		</button>
	);
}

export default TieButton;

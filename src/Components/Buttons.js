import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Buttons({prevPage, nextPage}){
	return(
		<div className="container">
			<div className="button-row row justify-content-center">
				<div className="btn">
					<button onClick={prevPage} className="btn btn-primary col-xs-6">Prev</button>
				</div>
				<div className="btn">
					<button onClick={nextPage} className="btn btn-primary col-xs-6">Next</button>
				</div>
			</div>
		</div>
	);
}

export default Buttons;
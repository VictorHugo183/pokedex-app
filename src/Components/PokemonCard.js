import React from 'react'
import typeColours from '../services/typeColours'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import {Link} from 'react-router-dom';

function PokemonCard({ id, name, image, types}) {
	return (
		<Link to={`/PokemonInfo/${id}`}
			className="link">
		<div className="col-lg-3 col-md-4 col-sm-6 cardwrap">
		<div className="card border-0">
				<img className="card-img-top rounded mx-auto" src={image} alt=""/>
		<div className="card-body pt-0">
			<div className="pokemon-id">
				#{id}
			</div>
			<div className="pokemon-name text-capitalize">
				{name}
			</div>
			<div className="pokemon-types text-capitalize">
				<span className="type1 rounded" style={{ backgroundColor: typeColours[types[0]]}}>
				{types[0]}</span>
				<span> </span>
				<span className="type2 rounded" style={{ backgroundColor: typeColours[types[1]]}}>
				{types[1]}</span>
				
			</div>
		</div>
		</div>
		</div>
		</Link>
	);
}

export default PokemonCard;
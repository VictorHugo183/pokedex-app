import React from 'react';
import PokemonCard from './PokemonCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buttons from './Buttons';

const PokemonCardList = ({pokemonData, prevPage, nextPage}) => {
	return (
	<>
		<Buttons prevPage={prevPage} nextPage={nextPage}/>
			<div className="row justify-content-center">
			{
				pokemonData.map((pokemon, i) =>{
					return (
						<PokemonCard
							key={pokemon.id}
							id={pokemon.id}
							name={pokemon.name}
							image={pokemon.sprites.front_default}
							types={pokemon.types.map((index) => {
							return index.type.name})
							}
						/>
					);
				})
			}
			</div>
		<Buttons prevPage={prevPage} nextPage={nextPage}/>
	</>
	);
}

export default PokemonCardList;

import React, { Component, useState, useEffect } from 'react';
import {getPokemon} from '../services/functions';
import $ from 'jquery'
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionIcon from '../question_icon.png';

import '../App.css';
import typeColours from '../services/typeColours'

$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

function PokemonInfo({number}){
	const url = window.location.href;
	const index = url.split('/')[url.split('/').length - 1];
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}`;
	const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}/`;

	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [types, setTypes] = useState([]);
	const [description, setDescription] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [abilities, setAbilities] = useState([]);
	const [abilityText1, setAbilityText1] = useState('');
	const [abilityText2, setAbilityText2] = useState('');
	const [abilityText3, setAbilityText3] = useState('');

	let [hp, setHP] = useState('');
	let [attack, setAttack] = useState('');
	let [defense, setDefense] = useState('');
	let [speed, setSpeed] = useState('');
	let [specialAttack, setSpecialAttack] = useState('');
	let [specialDefense, setSpecialDefense] = useState('');

useEffect(() =>{
	const getData = async () =>{
		const response = await fetch(pokemonUrl);
		const data = await response.json();
		setName(data.name);
		setId(data.id);
		setImageUrl(data.sprites.front_default);

		data.stats.map(stat =>{
			switch(stat.stat.name){
				case 'hp':
				setHP(stat['base_stat']);
				break;
				case 'attack':
				setAttack(stat['base_stat']);
				break;
				case 'defense':
				setDefense(stat['base_stat']);
				break;
				case 'speed':
				setSpeed(stat['base_stat']);
				break;
				case 'special-attack':
				setSpecialAttack(stat['base_stat']);
				break;
				case 'special-defense':
				setSpecialDefense(stat['base_stat']);
				break;
			}
		})

		//convert Decimeters to Feet. The "((0.0001 * 100) /100)" is for rounding to 2 deciaml places.
		setHeight(Math.round((data.height * 0.328084 + 0.0001) * 100) /100);
		//convert hectograms to kg.
		setWeight(Math.round((data.weight * 0.1 + 0.0001) * 100) /100);

		const pokemonTypes = data.types.map(type =>{
			return type.type.name
		});
		setTypes(pokemonTypes);

		setAbilities(data.abilities.map(ability =>{
			return ability.ability.name
		}))

		let abilitiesUrl = data.abilities.map(ability =>{
			return ability.ability.url
		})
		
		//get Ability descriptions. Pokemon can only have up to 3 possible abilities.
		//since each ability has their own Url, we need to run fetch() three different times.
		//there's probably a better way to do this, but only 2 if statements isn't so bad
		const abilityResp1 = await fetch(abilitiesUrl[0])
		const abilityData1 = await abilityResp1.json();
		abilityData1.flavor_text_entries.some(flavor =>{
			if(flavor.language.name === 'en' && flavor.version_group.name === "x-y"){
				setAbilityText1(flavor.flavor_text);
			}
		})

		if(abilitiesUrl.length > 1){
			const abilityResp2 = await fetch(abilitiesUrl[1])
			const abilityData2 = await abilityResp2.json();
			abilityData2.flavor_text_entries.some(flavor =>{
				if(flavor.language.name === 'en' && flavor.version_group.name === "x-y"){
					setAbilityText2(flavor.flavor_text);
				}
			})
		}

		if(abilitiesUrl.length === 3){
			const abilityResp3 = await fetch(abilitiesUrl[2])
			const abilityData3 = await abilityResp3.json();
			abilityData3.flavor_text_entries.some(flavor =>{
				if(flavor.language.name === 'en' && flavor.version_group.name === "x-y"){
					setAbilityText3(flavor.flavor_text);
				}
			})
		}
		///////////////////////////////////////////////
		
		//Get pokemon Descrition (flavour text) from the data fetched from speciesUrl
		const resp = await fetch(speciesUrl);
		const speciesData = await resp.json();
		speciesData.flavor_text_entries.some(flavor =>{
			if (flavor.language.name === 'en' && flavor.version.name === 'alpha-sapphire'){
				setDescription(flavor.flavor_text);
			}
		});
	};

	getData();

}, []);

	return(
	<div className="container">
			<div className="row justify-content-center">
				<div className="col-xs-6 pokemon-title offset-lg-4 offset-md-3 offset-sm-2 offset-xs-2">
					<h1 className="text-capitalize">{name}</h1>
				</div>
				<div className="pokemon-id col-xs-6 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-2">
					<h1>#{id}</h1>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-6 col-margin text-center infoImageWrapper rounded">
					<img className="rounded mx-auto infoImage"src={imageUrl} alt=""/>
				</div>

				<div className="col-sm-6">
					<div className="col-sm-12 rounded infoFlavor">
					{description}
					</div>
					<p></p>
					
					<div className="col-sm-12">
						<div className="row infoProperties rounded">
							<div className="col">
							<h5>Height</h5>
							<h6>{height} ft</h6>
							</div>


							<div className="col text-capitalize">
							<h5>Abilities</h5>
							<h6>{abilities[0]}  <a title={`${abilityText1}`} data-toggle="tooltip">
								<img src={QuestionIcon} alt="?" height="13px"/>
							 </a>
							 </h6>
							{abilities.length > 1 &&
							
							<h6>{abilities[1]} <a title={`${abilityText2}`} data-toggle="tooltip">
								<img src={QuestionIcon} alt="?" height="13px"/>
							 </a>
							 </h6>
							
							}
							{abilities.length > 2 &&
							 
							<h6>{abilities[2]} <a title={`${abilityText3}`} data-toggle="tooltip">
								<img src={QuestionIcon} alt="?"height="13px"/>
							 </a>
							</h6>
							
							}
							</div>

							<div className="w-100"></div>

							<div className="col">
							<h5>Weight</h5>
							<h6>{weight} kg</h6>
							</div>

							<div className="col text-capitalize">
								<h5>Types</h5>
								<span className="type1 rounded infoTypes" style={{ backgroundColor: typeColours[types[0]]}}>
								{types[0]}
								</span>
								<span> </span>
								{types.length > 1 &&
								<span className="type2 rounded infoTypes" style={{ backgroundColor: typeColours[types[1]]}}>
								{types[1]}
								</span>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container mt-2">
			<div className="row align-items-center infoStats">
				<div className="col-12 col-md-3 text-center">HP</div>
				<div className="col-12 col-md-9">
				<div className="progress">
				<div className="progress-bar" role="progressbar"
				style={{
					width: `${hp}%`
				}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
				<small>{hp}</small>
				</div>
				</div>
				</div>
			</div>

			<div className="row align-items-center infoStats">
				<div className="col-12 col-md-3 text-center">Attack</div>
				<div className="col-12 col-md-9">
				<div className="progress">
				<div className="progress-bar" role="progressbar"
				style={{
					width: `${attack}%`
				}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
				<small>{attack}</small>
				</div>
				</div>
				</div>
			</div>

			<div className="row align-items-center infoStats">
				<div className="col-12 col-md-3 text-center">Defense</div>
				<div className="col-12 col-md-9">
				<div className="progress">
				<div className="progress-bar" role="progressbar"
				style={{
					width: `${defense}%`
				}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
				<small>{defense}</small>
				</div>
				</div>
				</div>
			</div>

			<div className="row align-items-center infoStats">
				<div className="col-12 col-md-3 text-center">Speed</div>
				<div className="col-12 col-md-9">
				<div className="progress">
				<div className="progress-bar" role="progressbar"
				style={{
					width: `${speed}%`
				}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
				<small>{speed}</small>
				</div>
				</div>
				</div>
			</div>

			<div className="row align-items-center infoStats">
				<div className="col-12 col-md-3 text-center">Special Attack</div>
				<div className="col-12 col-md-9">
				<div className="progress">
				<div className="progress-bar" role="progressbar"
				style={{
					width: `${specialAttack}%`
				}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
				<small>{specialAttack}</small>
				</div>
				</div>
				</div>
			</div>

			<div className="row align-items-center infoStats bottom-row">
				<div className="col-12 col-md-3 text-center">Special Defense</div>
				<div className="col-12 col-md-9">
				<div className="progress">
				<div className="progress-bar" role="progressbar"
				style={{
					width: `${specialDefense}%`
				}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
				<small>{specialDefense}</small>
				</div>
				</div>
				</div>
			</div>
			</div>
	</div>
	)
}

export default PokemonInfo;
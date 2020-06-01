import React, {useState, useEffect} from 'react';
import {getPokemon} from './services/functions';
import PokemonCardList from './Components/PokemonCardList'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import PokemonInfo from './Components/PokemonInfo';
import Buttons from './Components/Buttons'

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'
  
//when component renders on the page, it runs useEffect
//empty array means we don't have any dependencies and it will only run once
  useEffect(() =>{
    async function fetchData(){
      let response = await getPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

    //fetch pokemon data from each pokemon and store in pokemonRecord
    //_pokemon will hold an array of objects, each obj being a pokemonRecord
    //take that array and store in a react state
  	const loadingPokemon = async (data) => {
    	let _pokemonData = await Promise.all(data.map(async pokemon =>{
    	let pokemonRecord = await getPokemon(pokemon.url);
    	return pokemonRecord
    	}));
    setPokemonData(_pokemonData);
 	};

  const nextPage = async () => {
  	setLoading(true);
  	let data = await getPokemon(nextUrl);
  	await loadingPokemon(data.results);
  	setNextUrl(data.next);
  	setPrevUrl(data.previous);
  	setLoading(false);
  }

   const prevPage = async () => {
   	if (!prevUrl){return;}
  	setLoading(true);
  	let data = await getPokemon(prevUrl);
  	await loadingPokemon(data.results);
  	setNextUrl(data.next);
  	setPrevUrl(data.previous);
  	setLoading(false);
  }

	return(
	<Router>
		<div className="app">
			{loading ? 
				( <h1> Loading... </h1> )
				:
				(
				<>
					<Navbar/>

					<div className="container wrap-container">	
					<Switch>
					<Route exact path="/" render={()=><PokemonCardList pokemonData={pokemonData}
					prevPage={prevPage} nextPage={nextPage}/>}/>
					<Route exact path="/PokemonInfo/:id" component={PokemonInfo}/>			
					</Switch>
					</div>

          <Footer />

				</>
				)
			}
		</div>
	</Router>
	);
}

export default App;
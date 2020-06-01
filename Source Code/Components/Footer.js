import React from 'react';
import '../App.css';

	const Footer = () =>{
		return(
			<div>
				<nav className="navbar navbar-expand-md footer bg-dark justify-content-between">
				<span className =" align-items-center">
					Powered by <a target="_blank" rel="noopener noreferrer" href="https://pokeapi.co/docs/v2">PokeAPI</a>
				</span>
				<span className="">Developed by Victor Nascimento</span>
				</nav>
			</div>
		)
	};

export default Footer;
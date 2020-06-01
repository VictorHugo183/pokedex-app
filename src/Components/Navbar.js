import React from 'react';
import {refreshPage} from '../services/functions';
import '../App.css';
import {Link} from 'react-router-dom';

	const Navbar = () =>{
		return(
			<div>
				<nav className="navbar navbar-expand-md navbar-top">
				<a className ="navbar-brand align-items-center" onClick={refreshPage}>
					<Link className="link-nav" to="/">Pokedex</Link>
				</a>
				</nav>
			</div>
		)
	};

export default Navbar;
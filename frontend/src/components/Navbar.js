import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { UserIdContext } from "./AppContext";
import Logout from "./Log/Logout";
const Navbar = () => {
	const uId = useContext(UserIdContext);
	return (
		<nav>
			<div className="logo-container">
				<img src="../images/icon-left-font-monochrome-black.png" alt="Logo" />
			</div>
			{uId ? (
				<ul>
					<li>
						<NavLink to="/profil">
							<FontAwesomeIcon icon={faUser} title="Aller sur votre rofil" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/feed">Fil d'actualités</NavLink>
					</li>

					<Logout />
				</ul>
			) : (
				<ul>
					<li>
						<NavLink to="/">Connexion</NavLink>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserIdContext } from "./AppContext";
import Logout from "./Log/Logout";
import { useSelector } from "react-redux";
const Navbar = () => {
	const uId = useContext(UserIdContext);
	const userData = useSelector((state) => state.userReducer);
	return (
		<header>
			<nav>
				<div className="logo-container">
					<img src="../images/icon-left-font-monochrome-white.png" alt="Logo" />
				</div>
				{uId ? (
					<ul>
						<li>
							<NavLink to="/profil">
								<img
									className="avatar-min"
									src={userData.avatar}
									alt="Photode profil"
								/>
								<h5>Bienvenue {userData.username}</h5>
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
		</header>
	);
};

export default Navbar;

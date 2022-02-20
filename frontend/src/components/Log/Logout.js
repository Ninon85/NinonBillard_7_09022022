import React from "react";
//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
const logout = () => {
	localStorage.clear();
	window.location = "/";
};
const Logout = () => {
	return (
		<li onClick={logout}>
			<FontAwesomeIcon icon={faRightFromBracket} title="Vous déconnecter" />
		</li>
	);
};

export default Logout;

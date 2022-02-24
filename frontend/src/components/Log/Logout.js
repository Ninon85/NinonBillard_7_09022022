import React from "react";
//font awesome

const logout = () => {
	localStorage.clear();
	window.location = "/";
};
const Logout = () => {
	return (
		<li onClick={logout}>
			<i className="fas fa-sign-out-alt" title="Déconnexion"></i>
		</li>
	);
};

export default Logout;

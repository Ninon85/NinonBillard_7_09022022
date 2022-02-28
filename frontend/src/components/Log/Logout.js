import React from "react";
//font awesome

const logout = () => {
	localStorage.clear();
	window.location = "/";
};
const Logout = () => {
	return (
		<li onClick={logout} tabIndex={0} onKeyPress={logout}>
			<i className="fas fa-sign-out-alt" title="Déconnexion"></i>
		</li>
	);
};

export default Logout;

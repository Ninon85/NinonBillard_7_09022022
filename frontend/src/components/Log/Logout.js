import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

const Logout = () => {
	// const userData = useSelector((state) => state.userReducer);
	const handlelogout = () => {
		// axios({
		// 	method: "post",
		// 	url: `${process.env.REACT_APP_API_URL}api/user/disconnect/${userData.id}`,
		// 	headers: {
		// 		authorization: `Bearer ${localStorage.getItem("token")}`,
		// 	},
		// })
		// 	.then(() => {
		localStorage.clear();
		window.location = "/";
		// })
		// .catch((error) => {
		// 	console.log(error);

		// 	alert(error.response.data.message);
		// });
	};

	return (
		<li onClick={handlelogout} tabIndex={0} onKeyPress={handlelogout}>
			<i className="fas fa-sign-out-alt" title="Déconnexion"></i>
		</li>
	);
};

export default Logout;

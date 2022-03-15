import React, { useEffect, useState } from "react";
//import browserRouter from node_module
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Navbar from "./components/Navbar";
import { loginContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { getUsers } from "./actions/users.actions";
import { isExpired, decodeToken } from "react-jwt";
import { getToken } from "./utils/utils";
const App = () => {
	const [uId, setUid] = useState(null);
	const [myToken, setMyToken] = useState(null);

	const dispatch = useDispatch();
	const isLogged = () => {
		setUid(parseInt(localStorage.getItem("id")));
		setMyToken(getToken());
		if (myToken && uId) {
			const myDecodedToken = decodeToken(myToken);
			const isMyTokenExpired = isExpired(myToken);

			if (!myDecodedToken || isMyTokenExpired) {
				localStorage.clear();
				window.location = "/";
				return;
			} else if (uId && myDecodedToken && !isMyTokenExpired) {
				dispatch(getUser(uId));
				dispatch(getUsers());
			}
		}
	};

	useEffect(isLogged);

	return (
		<loginContext.Provider value={uId}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="/feed" element={<Feed />} />
					{/* // if we insert a value in url we will be redirected at home */}
					<Route path="*" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</loginContext.Provider>
	);
};

export default App;

import React, { useEffect, useState } from "react";
//font awesome
// import {} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import browserRouter from node_module
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
// import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar";
import { loginContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { getUsers } from "./actions/users.actions";
import { isExpired, decodeToken } from "react-jwt";
const App = () => {
	const [uId, setUid] = useState(null);
	const [myToken, setMyToken] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		setUid(parseInt(localStorage.getItem("id")));
		setMyToken(localStorage.getItem("token"));
		if (myToken && uId) {
			const myDecodedToken = decodeToken(myToken);
			const isMyTokenExpired = isExpired(myToken);

			if (!myDecodedToken || isMyTokenExpired) {
				localStorage.clear();
			} else if (uId && myDecodedToken && !isMyTokenExpired) {
				dispatch(getUser(uId));
				dispatch(getUsers());
			}
		}
	}, [dispatch, myToken, uId]);

	return (
		<loginContext.Provider value={uId}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profil" element={<Profil />} />
					<Route path="/feed" element={<Feed />} />
					{/* // if we insert a value in url we will be redict at home */}
					<Route path="*" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</loginContext.Provider>
	);
};

export default App;

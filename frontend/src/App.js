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
import { UserIdContext } from "./components/AppContext";
const App = () => {
	const [uId, setUid] = useState(null);
	useEffect(() => {
		setUid(localStorage.getItem("token"));
		// console.log(uId);
	}, []);
	return (
		<UserIdContext.Provider value={uId}>
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
		</UserIdContext.Provider>
	);
};

export default App;

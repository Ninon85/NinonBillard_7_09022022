import React from "react";
//import browserRouter from node_module
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profil" element={<Profil />} />
				<Route path="/feed" element={<Feed />} />
				{/* // if we insert a value in url we will be redict at home */}
				<Route path="*" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

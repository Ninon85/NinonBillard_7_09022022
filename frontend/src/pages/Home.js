import React from "react";
import Log from "../components/Log";
const Home = () => {
	return (
		<div className="home-page">
			<div className="log-container">
				<Log signup={false} login={true} />
			</div>
		</div>
	);
};

export default Home;

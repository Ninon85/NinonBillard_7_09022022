import Footer from "../components/Footer";
import Log from "../components/Log";
const Home = () => {
	return (
		<>
			<div className="home-page">
				<h2 id="home-title">Partagez</h2>
				<div className="log-container">
					<Log signup={false} login={true} />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Home;

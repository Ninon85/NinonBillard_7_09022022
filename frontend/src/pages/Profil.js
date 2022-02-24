import React from "react";
import IndexProfil from "../components/profil/Index";

const Profil = () => {
	return (
		<div className="profil-page">
			<IndexProfil updateProfil={false} profil={true} />
		</div>
	);
};

export default Profil;

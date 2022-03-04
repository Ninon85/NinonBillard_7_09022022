import React, { useState } from "react";

import ProfilUser from "../components/profil/ProfilUser";
import UpdateProfil from "../components/profil/UpdateProfil";

const Profil = () => {
	const [profilModal, setProfilModal] = useState(false); //inverser true false
	const [updateModal, setUpdateModal] = useState(true);
	const handleModals = (e) => {
		if (e.target.id === "profil") {
			setProfilModal(true);
			setUpdateModal(false);
		} else if (e.target.id === "updateProfil") {
			setProfilModal(false);
			setUpdateModal(true);
		}
	};
	return (
		<div className="profil-page">
			<ul className={updateModal ? "options-profil-update" : "options-profil"}>
				<li
					onClick={handleModals}
					id="profil"
					className={profilModal ? "hidden" : null}
				>
					Retourner sur votre profil
				</li>
				<li
					onClick={handleModals}
					id="updateProfil"
					className={updateModal ? "hidden" : null}
				>
					Mettre à jour votre profil
				</li>
			</ul>
			{profilModal && <ProfilUser />}
			{updateModal && <UpdateProfil />}
		</div>
	);
};

export default Profil;

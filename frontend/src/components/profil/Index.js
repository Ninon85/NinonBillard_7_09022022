import React, { useState } from "react";
import UpdateProfil from "./UpdateProfil";
import ProfilUser from "./ProfilUser";

const IndexProfil = (props) => {
	const [profilModal, setProfilModal] = useState(props.profil);
	const [updateModal, setUpdateModal] = useState(props.updateProfil);
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
		<>
			<div id="profil-list">
				<ul>
					<li
						onClick={handleModals}
						id="profil"
						className={profilModal ? "hidden" : null}
					>
						profil
					</li>
					<li
						onClick={handleModals}
						id="updateProfil"
						className={updateModal ? "hidden" : null}
					>
						Mettre à jour votre profil
					</li>
				</ul>
			</div>
			{profilModal && <ProfilUser />}
			{updateModal && <UpdateProfil />}
		</>
	);
};

export default IndexProfil;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJob, updateMail } from "../../actions/user.actions";
import Unsubscribe from "./Unsubscribe";
// import Profil from "../../pages/Profil";
import UploadAvatar from "./UploadAvatar";
const UpdateProfil = () => {
	const userData = useSelector((state) => state.userReducer);
	const [job, setJob] = useState("");
	const [updateForm, setUpdateForm] = useState(false);
	const [email, setEmail] = useState("");
	const [updateFormMail, setUpdateFormMail] = useState(false);
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	//
	const handleUpdate = () => {
		dispatch(updateJob(job, userData.id));
		setUpdateForm(false);
	};
	const handleUpdateMail = () => {
		dispatch(updateMail(email, password, userData.id));
		setUpdateFormMail(false);
	};
	const cancelInfo = (e) => {
		if (e.target.id === "mailAddress") {
			setEmail("");
			setUpdateFormMail(!updateFormMail);
		} else if (e.target.id === "jobPost") {
			setJob("");
			setUpdateForm(!updateForm);
		}
	};
	return (
		<>
			<div className="profil-container">
				<section className="update-container">
					<h2>{userData.username}</h2>
					<div className="pic-container">
						<img
							className="profil-picture"
							src={userData.avatar}
							alt={"Photo de profil de " + userData.username}
						/>
						<UploadAvatar />
					</div>
					<div className="job-update">
						<h2>Post occupé</h2>

						{updateForm === false && (
							<>
								<p onClick={() => setUpdateForm(!updateForm)}>{userData.job}</p>
								<button onClick={() => setUpdateForm(!updateForm)}>
									Modifier post
								</button>
							</>
						)}
						{updateForm && (
							<>
								<input
									type="text"
									name=""
									id=""
									defaultValue={userData.job}
									onChange={(e) => setJob(e.target.value)}
								/>
								<button onClick={handleUpdate}>
									Valider les modifications
								</button>
								<button id="jobPost" onClick={cancelInfo}>
									Annuler
								</button>
							</>
						)}
					</div>
					<div className="email-update">
						<h2>Email</h2>
						{updateFormMail === false && (
							<>
								<p onClick={() => setUpdateFormMail(!updateFormMail)}>
									{userData.email}
								</p>
								<button onClick={() => setUpdateFormMail(!updateFormMail)}>
									Modifier l'email
								</button>
							</>
						)}
						{updateFormMail && (
							<>
								<input
									type="email"
									name=""
									id=""
									defaultValue={userData.email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<input
									type="password"
									// name=""
									// id=""
									placeholder="Veuillez renseigner votre mot de passe"
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button onClick={handleUpdateMail}>
									Valider les modifications
								</button>
								<button id="mailAddress" onClick={cancelInfo}>
									Annuler
								</button>
							</>
						)}
					</div>
					<div className="unsubscribe">
						<Unsubscribe user={userData} />
					</div>
				</section>
			</div>
		</>
	);
};

export default UpdateProfil;

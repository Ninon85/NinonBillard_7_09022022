import React from "react";
import axios from "axios";
import { useState } from "react";

const SignUpForm = () => {
	const [username, setUserNameValue] = useState("");
	const [job, setJobValue] = useState("");
	const [email, setEmailValue] = useState("");
	const [password, setPasswordValue] = useState("");
	const handleSignUp = (e) => {
		e.preventDefault();
		const loginError = document.querySelector(".loginError");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/signup`,
			withCredentials: false,
			data: {
				username,
				email,
				password,
				job,
			},
		})
			.then((res) => {
				// localStorage.setItem("token", res.data.token);
				// localStorage.setItem("id", res.data.userId);

				window.location = "/";
			})
			.catch((err) => {
				console.log(err.response);
				if (err.response.status === 422 && err.response.data.username) {
					loginError.innerHTML = err.response.data.username.msg;
				} else if (err.response.status === 422 && err.response.data.email) {
					loginError.innerHTML = err.response.data.email.msg;
				} else if (err.response.status === 422 && err.response.data.message) {
					loginError.innerHTML = err.response.data.message;
				} else if (err.response.data.message) {
					loginError.innerHTML = err.response.data.message;
				} else if (err.response.status === 422 && err.response.data.job) {
					loginError.innerHTML = err.response.data.job.msg;
				} else {
					console.log(err);
				}
			});
	};

	return (
		<form onSubmit={handleSignUp} id="logForm">
			<label htmlFor="userName">Prénom</label>
			<br />
			<input
				type="text"
				name="userName"
				id="userName"
				placeholder="Votre prénom"
				onChange={(e) => setUserNameValue(e.target.value)}
				value={username}
			/>
			<br />
			<label htmlFor="job">Emploi</label>
			<br />
			<input
				type="text"
				name="job"
				id="job"
				placeholder="Quel post occupez vous ?"
				onChange={(e) => setJobValue(e.target.value)}
				value={job}
			/>
			<br />
			<label htmlFor="email">Email</label>
			<br />
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Votre adresse mail"
				onChange={(e) => setEmailValue(e.target.value)}
				value={email}
			/>
			<br />
			<label htmlFor="password">Mot de passe</label>
			<br />
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Votre mot de passe"
				onChange={(e) => setPasswordValue(e.target.value)}
				value={password}
			/>
			<div className="loginError"></div>
			<br />
			<input type="submit" value="S'inscrire" />
		</form>
	);
};

export default SignUpForm;

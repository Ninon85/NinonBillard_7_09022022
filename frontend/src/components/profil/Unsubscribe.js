import React from "react";
import axios from "axios";

const Unsubscribe = ({ user }) => {
	const leave = () => {
		axios({
			method: "delete",
			url: `${process.env.REACT_APP_API_URL}api/user/unsubscribe/${user.id}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: { userId: user.id },
		}).then(() => {
			localStorage.clear();
			window.location = "/";
		});
	};
	return (
		<p
			tabIndex={0}
			onClick={() => {
				if (
					window.confirm(
						`Voulez vous vraiment vous désinscrire ${user.username} ? 😥`
					)
				) {
					leave();
				}
			}}
			onKeyPress={() => {
				if (
					window.confirm(
						`Voulez vous vraiment vous désinscrire ${user.username} ? 😥`
					)
				) {
					leave();
				}
			}}
		>
			Vous désinscrire
		</p>
	);
};

export default Unsubscribe;

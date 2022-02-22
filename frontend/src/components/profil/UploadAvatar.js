import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
const UploadAvatar = () => {
	const [file, setFile] = useState();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userReducer);

	const handleAvatar = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("image", file);
		dispatch(uploadPicture(data, userData.id));
	};
	return (
		<form action="" onSubmit={handleAvatar} className="upload-avatar">
			<label htmlFor="image">Changer d'avatar</label>
			<input
				type="file"
				name="image"
				id="image"
				accept=".jpg, .jpeg, .png, .gif"
				onChange={(e) => setFile(e.target.files[0])}
			/>
			<input type="submit" value="Envoyer" />
		</form>
	);
};

export default UploadAvatar;

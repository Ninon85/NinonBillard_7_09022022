import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePostPic } from "../../actions/post.actions";

const UpdatePostPic = ({ post }) => {
	const [file, setFile] = useState();
	const dispatch = useDispatch();
	const content = post.content;
	const userData = useSelector((state) => state.userReducer);
	const newPost = {
		userId: userData.id,
		content,
		attachment: "",
	};

	const [updatedPic, setUpdatedPic] = useState(false);
	const handlePicture = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("post", JSON.stringify(newPost));
		data.append("image", file);
		dispatch(updatePostPic(post.id, data));
		setUpdatedPic(false);
	};

	return (
		<div>
			{updatedPic === false ? (
				<div>
					<i
						className="fa fa-file-image-o"
						onClick={() => setUpdatedPic(!updatedPic)}
					></i>
				</div>
			) : (
				<>
					<div>
						<i
							className="fa fa-file-image-o"
							onClick={() => setUpdatedPic(!updatedPic)}
						></i>
					</div>
					<form action="" onSubmit={handlePicture} className="upload-avatar">
						<label htmlFor="image">Changer d'image</label>
						<input
							type="file"
							name="image"
							id="image"
							accept=".jpg, .jpeg, .png, .gif"
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<input type="submit" value="Envoyer" />
					</form>
				</>
			)}
		</div>
	);
};

export default UpdatePostPic;

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

	const handlePicture = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("post", JSON.stringify(newPost));
		data.append("image", file);
		dispatch(updatePostPic(post.id, data));
		setFile("");
	};

	return (
		<div>
			<>
				<form action="" onSubmit={handlePicture} className="upload-post-pic">
					<label htmlFor="image">
						<i className="fa fa-file-image-o"></i>
					</label>
					<input
						className="hidden"
						type="file"
						name="image"
						id="image"
						accept=".jpg, .jpeg, .png, .gif"
						onChange={(e) => {
							document.getElementById(post.id).src = URL.createObjectURL(
								e.target.files[0]
							);
							setFile(e.target.files[0]);
						}}
					/>
					{file && <input type="submit" value="Enregistrer" />}
				</form>
			</>
		</div>
	);
};

export default UpdatePostPic;

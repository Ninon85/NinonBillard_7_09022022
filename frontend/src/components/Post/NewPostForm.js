import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	createPostContent,
	createPostWithPic,
	getPosts,
} from "../../actions/post.actions";

const NewPostForm = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [text, setText] = useState("");
	//to send to DB
	const [file, setFile] = useState();
	// for pré render
	const [postPic, setPostPic] = useState(null);
	const userData = useSelector((state) => state.userReducer);
	useEffect(() => {
		if (userData !== null) setIsLoading(false);
	}, [userData]);
	const newPost = {
		userId: userData.id,
		content: text,
		attachment: "",
	};
	const handlePost = () => {
		const data = new FormData();
		// if (file) {
		data.append("post", JSON.stringify(newPost));
		data.append("image", file);
		dispatch(createPostWithPic(data)).then(() => {
			dispatch(getPosts());
			cancelPost();
		});
		// } else {
		// 	dispatch(createPostContent(userData.id, text));
		// }
	};
	const handlePicture = (e) => {
		setPostPic(URL.createObjectURL(e.target.files[0]));
	};
	const cancelPost = () => {
		setText("");
		setPostPic("");
		setFile("");
	};
	return (
		<div className="post-form-container">
			{isLoading ? (
				<i className="fas fa-spinner fa-pulse"></i>
			) : (
				<>
					<div className="form-header">
						<img
							src={userData.avatar}
							alt={"Photo de profil de " + userData.username}
							className="avatar-min"
						/>
					</div>
					<div className="post-form">
						<textarea
							name="content-post"
							id="content-post"
							placeholder={"Que voulez-vous dire " + userData.username + " ?"}
							onChange={(e) => setText(e.target.value)}
							value={text}
						/>

						<div className="footer-form">
							<div className="icon-container">
								<label htmlFor="image-upload">
									<i
										className="fa fa-file-image-o"
										title="Télécharger une image"
									></i>
								</label>

								<input
									type="file"
									name="image"
									id="image-upload"
									accept=".jpg, .jpeg, .gif, .png"
									onChange={(e) => {
										handlePicture(e);
										setFile(e.target.files[0]);
									}}
								/>
								{text || postPic ? (
									<ul>
										<li className="pre-render">
											<div className="avatar-container">
												<img
													src={userData.avatar}
													alt={"Photo de profil de " + userData.username}
													className="avatar-min"
												/>
											</div>
											<div className="right-side">
												<div className="pré-render-header">
													<h3>{userData.username}</h3>
												</div>
												<div className="pre-render-content"> {text}</div>
												<img className="pre-render-pic" src={postPic} alt="" />
											</div>
										</li>
									</ul>
								) : null}
							</div>
							<div className="btn-send-form-container">
								{text || postPic ? (
									<>
										<button className="cancel" onClick={cancelPost}>
											Annuler
										</button>
										<button className="send" onClick={handlePost}>
											Envoyer
										</button>
									</>
								) : null}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default NewPostForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import DeleteEditComment from "./DeleteEditComment";

const CardComments = ({ post }) => {
	const [text, setText] = useState("");
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const handleComment = (e) => {
		e.preventDefault();
		if (text) {
			dispatch(addComment(userData.id, post.id, text)).then(() =>
				dispatch(getPosts()).then(() => setText(""))
			);
		}
	};

	// console.log(usersData);
	return (
		<div className="comments-container">
			{post.Comments.map((comment) => {
				return (
					<div
						className={
							comment.userId === userData.id
								? "comment-container-owner"
								: "comment-container"
						}
						key={comment.id}
					>
						<div className="left-side">
							<img
								className="avatar-min"
								src={
									usersData.length >= 0
										? usersData
												.map((user) => {
													if (user.id === comment.userId) return user.avatar;
													else return null;
												})
												.join("")
										: null
								}
								alt={"Avatar"}
							/>
						</div>
						<div className="rigth-side">
							<div className="comment-header">
								<h3>
									{usersData.length >= 0 &&
										usersData
											.map((user) => {
												if (user.id === comment.userId) return user.username;
												else return null;
											})
											.join("")}
								</h3>
								<span>{comment.createdAt}</span>
							</div>
							<div className="comment-footer">
								<p>{comment.content}</p>
								<div className="edit-comment">
									{/* {userData.id === comment.userId && <span>Modifier</span>} */}
									{userData.id === comment.userId ||
									userData.isAdmin === true ? (
										<DeleteEditComment comment={comment} postId={post.id} />
									) : null}
								</div>
							</div>
						</div>
					</div>
				);
			})}
			{userData.id && (
				<form action="" onSubmit={handleComment} className="comment-form">
					<input
						type="text"
						name="text"
						id="text"
						onChange={(e) => setText(e.target.value)}
						value={text}
						placeholder={
							post.Comments.length === 0
								? "Soyez le premier à commenter"
								: "Commenter"
						}
					/>
					<br />
					<input type="submit" value="Envoyer" />
				</form>
			)}
		</div>
	);
};

export default CardComments;

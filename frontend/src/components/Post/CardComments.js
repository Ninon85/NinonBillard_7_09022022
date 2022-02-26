import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/users.actions";

const CardComments = ({ post }) => {
	// const [text, setText] = useState("");

	const userData = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	// const handleComment = () => {};
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);
	const usersData = useSelector((state) => state.usersReducer);
	console.log(usersData);
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
									usersData.length > 0 &&
									usersData
										.map((user) => {
											if (user.id === comment.userId) return user.avatar;
											else return null;
										})
										.join("")
								}
								alt={"Avatar "}
							/>
						</div>
						<div className="rigth-side">
							<div className="comment-header">
								<h3>
									{usersData.length > 0 &&
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
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CardComments;

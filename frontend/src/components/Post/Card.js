import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePostContent } from "../../actions/post.actions";

import { UserIdContext } from "../AppContext";
import { isEmpty } from "../Utils";
import DeleteCard from "./DeleteCard";
import LikeBtn from "./LikeBtn";
import UpdatePostPic from "./UpdatePostPic";

const Card = ({ post }) => {
	// console.log(post);
	const dispatch = useDispatch();
	const uId = useContext(UserIdContext);
	//is loading ? true
	const [loading, setLoading] = useState(true);
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [adminUser, setAdminUser] = useState(false);
	const userData = useSelector((state) => state.userReducer);

	const updateText = () => {
		if (textUpdate) {
			dispatch(updatePostContent(post.id, uId, textUpdate));
		}
		setIsUpdated(false);
	};

	useEffect(() => {
		!isEmpty(post) && setLoading(false);
		userData.isAdmin === true && setAdminUser(true);
	}, [post, userData.isAdmin]);
	return (
		<li className="card-container" key={post.id}>
			{loading ? (
				<i className="fas fa-spinner fa-spin"></i>
			) : (
				<>
					<div className="card-header">
						<div className="card-avatar">
							<img
								className="avatar-min"
								src={post.User.avatar}
								alt={"Photo de profil de " + post.User.username}
							/>
						</div>
						<h3>{post.User.username}</h3>
						<span className="card-date">{post.createdAt}</span>
					</div>
					<div className="card-contents">
						{isUpdated === false && (
							<p className="card-content">{post.content}</p>
						)}
						{isUpdated && (
							<div className="update-post">
								<textarea
									defaultValue={post.content}
									onChange={(e) => setTextUpdate(e.target.value)}
								/>
								<div className="update-btn-container">
									<button className="btn" onClick={updateText}>
										Valider les modifications
									</button>
								</div>
							</div>
						)}
						{post.attachment !== "" && (
							<img
								className="card-picture"
								src={post.attachment}
								alt={post.content}
							/>
						)}
					</div>
					<div className="edit-ctrl-container">
						{userData.id === post.userId && (
							<>
								<div className="btn-container">
									{/* toggle btn */}
									<div onClick={() => setIsUpdated(!isUpdated)}>
										<i
											className="fas fa-edit"
											title="Modifier la description"
										></i>
									</div>
								</div>
								{/* <div className="btn-container"> */}
								<UpdatePostPic post={post} />
								{/* </div> */}
							</>
						)}
						{userData.id === post.userId || adminUser ? (
							<div className="btn-container">
								<DeleteCard id={post.id} />
							</div>
						) : null}
					</div>
					<div className="card-footer">
						<div className="comment-icon">
							<i className="fas fa-comment-dots" title="Commenter"></i>
							<span>{post.Comments.length}</span>
						</div>
						<LikeBtn post={post} />
					</div>
				</>
			)}
		</li>
	);
};

export default Card;

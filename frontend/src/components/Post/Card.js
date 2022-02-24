import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import LikeBtn from "./LikeBtn";

const Card = ({ post }) => {
	// console.log(post);
	//is loading ? true
	const [loading, setLoading] = useState(true);
	// const userData = useSelector((state) => state.userReducer);

	useEffect(() => {
		!isEmpty(post) && setLoading(false);
	}, [post]);
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
						<p className="card-content">{post.content}</p>
						{post.attachment !== "" && (
							<img
								className="card-picture"
								src={post.attachment}
								alt={post.content}
							/>
						)}
					</div>
					<div className="card-footer">
						<div className="comment-icon">
							<i className="fas fa-comment-dots" title="Commenter"></i>
							<span>{post.Comments.length}</span>
						</div>
						<LikeBtn post={post} />

						<span>{post.Likes.length}</span>
					</div>
				</>
			)}
		</li>
	);
};

export default Card;

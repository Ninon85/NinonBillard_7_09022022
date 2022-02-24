import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
	//load post ? true
	const [loadPost, setLoadPost] = useState(true);
	//dispatch for send action
	const dispatch = useDispatch();
	//recuperer les post
	const posts = useSelector((state) => state.postReducer);
	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts());
			setLoadPost(false);
		}
	}, [loadPost, dispatch]);
	return (
		<div className="thread-container">
			<ul className="thread-ul">
				{!isEmpty(posts[0]) &&
					posts.map((post) => {
						return <Card post={post} key={post.id} />;
					})}
			</ul>
		</div>
	);
};

export default Thread;

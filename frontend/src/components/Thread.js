import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
	//load post ? true
	const [loadPost, setLoadPost] = useState(true);
	//number of post
	const [count, setCount] = useState(6);
	//dispatch for send action
	const dispatch = useDispatch();
	//recuperer les post
	const posts = useSelector((state) => state.postReducer);
	// console.log(document.documentElement.scrollTop);
	//infinite scroll
	const loadMore = () => {
		// when the scroll is a the bottom (+1px for integer number )
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >
			document.scrollingElement.scrollHeight
		) {
			setLoadPost(true);
		}
	};
	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts(count));
			setLoadPost(false);
			setCount(count + 6);
		}
		window.addEventListener("scroll", loadMore);
		return () => window.removeEventListener("scroll", loadMore);
	}, [loadPost, count, dispatch]);
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

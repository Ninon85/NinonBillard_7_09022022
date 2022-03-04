import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post.actions";

import Card from "../Post/Card";

import { isEmpty } from "../Utils";

const ProfilUser = () => {
	//load post ? true
	const [loadPost, setLoadPost] = useState(true);
	const [count, setCount] = useState(6);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.postReducer);

	const userData = useSelector((state) => state.userReducer);
	const userId = userData.id;

	const loadMore = () => {
		// when the scroll is at the bottom (+1px for integer number )
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
	}, [loadPost, count, dispatch, userId]);

	return (
		<main id="UserPost">
			<h2>Vos Publications</h2>
			<ul className="post-list">
				{!isEmpty(posts[0]) &&
					posts.map((post) => {
						if (post.userId === userId) {
							return <Card post={post} key={post.id} />;
						}
						return null;
					})}
			</ul>
		</main>
	);
};

export default ProfilUser;

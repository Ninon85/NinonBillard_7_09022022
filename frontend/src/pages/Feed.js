import React from "react";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";

const Feed = () => {
	return (
		<div className="feed">
			<main className="feed-main">
				<div className="feed-post-header">
					<NewPostForm />
				</div>
				<Thread />
			</main>
		</div>
	);
};

export default Feed;

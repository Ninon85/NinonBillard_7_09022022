import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../../actions/post.actions";

const initaialState = {};
export default function postReducer(state = initaialState, action) {
	switch (action.type) {
		case GET_POSTS:
			//res.data of action getPost
			return action.payload;
		case LIKE_POST:
			return state.map((post) => {
				if (post.id === action.payload.postId) {
					return {
						...post,
						Likes: [action.payload, ...post.Likes],
					};
				}
				return post;
			});
		case UNLIKE_POST:
			return state.map((post) => {
				if (post.id === action.payload.postId) {
					return {
						...post,
						Likes: post.Likes.filter(
							(like) => like.userId !== action.payload.userId
						),
					};
				}
				return post;
			});
		default:
			return state;
	}
}

import {
	GET_POSTS,
	LIKE_POST,
	UNLIKE_POST,
	UPDATE_POST_CONTENT,
	UPDATE_POST_PIC,
	DELETE_POST,
} from "../../actions/post.actions";

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

		case UPDATE_POST_CONTENT:
			return state.map((post) => {
				if (post.id === action.payload.id) {
					return {
						...post,
						content: action.payload.content,
					};
				}
				return post;
			});
		case UPDATE_POST_PIC:
			return state.map((post) => {
				if (post.id === action.payload.id) {
					return {
						...post,
						attachment: action.payload.attachment,
					};
				}
				return post;
			});

		case DELETE_POST:
			return state.filter((post) => post.id !== action.payload.postId);
		default:
			return state;
	}
}

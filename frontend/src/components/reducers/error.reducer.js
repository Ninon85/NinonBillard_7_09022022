import { GET_POST_ERRORS } from "../../actions/post.actions";
import { UPLOAD_ERRORS } from "../../actions/user.actions";

// we create an array who contain errors for post
const initaialState = { uploadErrors: [], postErrors: [] };
export default function errorReducer(state = initaialState, action) {
	switch (action.type) {
		case GET_POST_ERRORS:
			return {
				postErrors: action.payload,
				uploadErrors: [],
			};
		case UPLOAD_ERRORS:
			return {
				uploadErrors: action.payload,
				postErrors: [],
			};

		default:
			return state;
	}
}

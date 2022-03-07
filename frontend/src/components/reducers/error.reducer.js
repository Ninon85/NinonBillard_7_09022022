// // import { UPDATE_POST_CONTENT_ERROR } from "../../actions/post.actions";

const initialState = { error: null };
export default function errorReducer(state = initialState, action) {
	// 	// switch (action.type) {
	// 	// 	case UPDATE_POST_CONTENT_ERROR:
	// 	// 		return {
	// 	// 			...state,
	// 	// 			error: action.payload.error,
	// 	// 		};
	// 	// 	default:
	// 	// 		return state;
	// 	// }
	if (!action.error) {
		return {
			...state,
			error: null,
		};
	}

	return {
		...state,
		error: action.payload.error,
	};
	// const { error } = action;

	// if (error) {
	// 	return {
	// 		...state,
	// 		error: error,
	// 	};
	// }

	// return state;
}

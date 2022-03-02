// import { createSelector } from "reselect";
// import { get } from "lodash";

// import {
// 	POST_ERRORS,
// 	UPDATE_POST_CONTENT_ERRORS,
// } from "../../actions/post.actions";
// import { UPLOAD_ERRORS } from "../../actions/user.actions";

// // we create an array who contain errors for post
// const initialState = { uploadErrors: [], postErrors: [], updatePostErrors: [] };
// export default function errorReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case POST_ERRORS:
// 			return {
// 				postErrors: action.payload,
// 				uploadErrors: [],
// 				updatePostErrors: [],
// 			};
// 		case UPLOAD_ERRORS:
// 			return {
// 				uploadErrors: action.payload,
// 				postErrors: [],
// 				updatePostErrors: [],
// 			};
// 		case UPDATE_POST_CONTENT_ERRORS:
// 			console.log(action);
// 			if (!action.err) {
// 				return {
// 					...state,
// 					updatePostErrors: { error: null },
// 				};
// 			}

// 			return {
// 				...state,
// 				updatePostErrors: { error: action.err.response.data },
// 			};

// 		default:
// 			return state;
// 	}
// }
// export default function errorReducer(state, action) {
// 	if (!action.error) {
// 		return {
// 			...state,
// 			error: null,
// 		};
// 	}

// 	return {
// 		...state,
// 		error: {
// 			// errorMessage: DEFAULT_ERROR_MESSAGE,
// 			...action.payload.response.data,
// 		},
// 	};
// }
// export const errorActionCreator = (errorType, error) => {
// 	return {
// 		type: errorType,
// 		error: true,
// 		payload: error,
// 	};
// };
// // export const createErrorSelector = (fn) => {
// // 	return createSelector(fn, (storeIndex) =>
// // 		get(storeIndex, "error.errorMessage", null)
// // 	);
// // };

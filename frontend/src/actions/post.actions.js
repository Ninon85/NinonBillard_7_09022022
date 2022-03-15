import axios from "axios";

//postS
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST_CONTENT = "UPDATE_POST_CONTENT";
export const UPDATE_POST_PIC = "UPDATE_POST_PIC";
export const DELETE_POST = "DELETE_POST";
export const CREATE_POST_WITH_PIC = "CREATE_POST_WITH_PIC";
export const CREATE_POST_CONTENT = "CREATE_POST_CONTENT";
//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
//error
export const UPDATE_POST_CONTENT_ERROR = "UPDATE_POST_CONTENT_ERROR";

export const getPosts = (num) => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/post`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			//keep posts 1 to 6
			const array = res.data.slice(0, num);
			dispatch({ type: GET_POSTS, payload: array });
		} catch (error) {
			console.log(error);
			if (error.response) {
				alert(error.response.data.message);
			}
			if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};

export const likePost = (postId) => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					likes: 1,
				},
			});
			dispatch({ type: LIKE_POST, payload: res.data });
		} catch (err) {
			alert(err.response.data.message);
			console.log(err);
			if (err.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
export const unlikePost = (postId) => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					likes: 1,
				},
			});
			dispatch({ type: UNLIKE_POST, payload: res.data });
		} catch (error) {
			console.log(error);
			if (error.response) {
				alert(error.response.data.message);
			}
			if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
export const updatePostContent = (postId, userId, content) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "put",
				url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					userId,
					content,
				},
			});
			dispatch({
				type: UPDATE_POST_CONTENT,
				payload: { postId, userId, content },
			});
		} catch (error) {
			//test
			// dispatch(updatePostContentError(error.response.data.message));
			// dispatch({
			// 	type: UPDATE_POST_CONTENT_ERROR,
			// 	payload: {
			// 		error,
			// 	},
			// });
			//////////////////////////////////////////
			// console.log(error);
			if (error.response.data.content) {
				alert(error.response.data.content.msg);
			} else if (error.response.data.message) {
				alert(error.response.data.message);
			} else if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
// const updatePostContentError = (error) => ({
// 	type: UPDATE_POST_CONTENT,
// 	payload: null,
// 	error: error,
// });

export const deletePost = (postId) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "delete",
				url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch({ type: DELETE_POST, payload: { postId } });
		} catch (error) {
			console.log(error);
			if (error.response) {
				alert(error.response.data.message);
			}
			if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
export const createPostWithPic = (data) => {
	return async (dispatch) => {
		try {
			return await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/post`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "multipart/form-data",
				},
				data,
			});
		} catch (error) {
			console.log(error);
			if (error.response) {
				alert("Fichier trop volumineux");
			}
			if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
export const createPostContent = (userId, content) => {
	return async (dispatch) => {
		try {
			return await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/post`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					userId,
					content,
					attachment: "",
				},
			});
		} catch (error) {
			console.log(error.response.data);
			if (error.response.data.err) {
				alert("Max 2000 caractères");
			}
			if (error.response.data.message) {
				alert(error.response.data.message);
			}
			if (error.response.data.content) {
				alert("Minimun 2 caractères ou 2 émticônes ☺😉");
			}
			if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
//Comments
//create comment will create an id for the commpent so we need to make a request for get all posts
export const addComment = (userId, postId, content) => {
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/comment`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					userId,
					postId,
					content,
				},
			});
			dispatch({ type: ADD_COMMENT, payload: res.data });
		} catch (error) {
			console.log(error.response.data);
			if (error.response.data.name === "SequelizeDatabaseError") {
				alert("Max 600 caractères");
			} else if (error.response.data.message) {
				alert(error.response.data.message);
			} else if (error.response.data.content) {
				alert("Minimun 2 caractères ou 2 émticônes ☺😉");
			} else if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
export const deleteComment = (postId, commentId) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "delete",
				url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
		} catch (error) {
			console.log(error);
			if (error.response) {
				alert(error.response.data.message);
			}
			if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
export const updateComment = (postId, commentId, content) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "put",
				url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: {
					content,
				},
			});
			dispatch({
				type: UPDATE_COMMENT,
				payload: { postId, commentId, content },
			});
		} catch (error) {
			console.log(error.response.data);
			if (error.response.data.name === "SequelizeDatabaseError") {
				alert("Max 600 caractères");
			} else if (error.response.data.message) {
				alert(error.response.data.message);
			} else if (error.response.data.content) {
				alert("Minimun 2 caractères ou 2 émticônes ☺😉");
			} else if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};

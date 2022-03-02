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

export const getPosts = (num) => {
	return (dispatch) => {
		return axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/post`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				//keep posts 1 to 6
				const array = res.data.slice(0, num);
				dispatch({ type: GET_POSTS, payload: array });
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};

export const likePost = (postId) => {
	return (dispatch) => {
		return axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: {
				likes: 1,
			},
		})
			.then((res) => {
				dispatch({ type: LIKE_POST, payload: res.data });
			})
			.catch((err) => {
				alert(err.response.data.message);
				console.log(err);
			});
	};
};
export const unlikePost = (postId) => {
	return (dispatch) => {
		return axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: {
				likes: 1,
			},
		})
			.then((res) => {
				dispatch({ type: UNLIKE_POST, payload: res.data });
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};
export const updatePostContent = (postId, userId, content) => {
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: {
				userId,
				content,
			},
		})
			.then((res) => {
				dispatch({ type: UPDATE_POST_CONTENT, payload: res.data });
				// dispatch({ type: UPDATE_POST_CONTENT_ERRORS });
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};
export const updatePostPic = (postId, data) => {
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "multipart/form-data",
			},
			data,
		})
			.then((res) => {
				dispatch({ type: UPDATE_POST_PIC, payload: res.data });
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};
export const deletePost = (postId) => {
	return (dispatch) => {
		return axios({
			method: "delete",
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				dispatch({ type: DELETE_POST, payload: { postId } });
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};
export const createPostWithPic = (data) => {
	return (dispatch) => {
		return axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/post`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "multipart/form-data",
			},
			data,
		}).catch((error) => {
			console.log(error);
			if (error.response) {
				alert(error.response.data.message);
			}
		});
	};
};
export const createPostContent = (userId, content) => {
	return (dispatch) => {
		return axios({
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
		}).catch((error) => {
			console.log(error);
			if (error.response) {
				alert(error.response.data.message);
			}
		});
	};
};
//Comments
//create comment will create an id for the commpent so we need to make a request for get all post whith c
export const addComment = (userId, postId, content) => {
	return (dispatch) => {
		return axios({
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
		})
			.then((res) => {
				dispatch({ type: ADD_COMMENT, payload: res.data });
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};
export const deleteComment = (postId, commentId) => {
	return (dispatch) => {
		return axios({
			method: "delete",
			url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};
export const updateComment = (postId, commentId, content) => {
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: {
				content,
			},
		})
			.then((res) => {
				dispatch({
					type: UPDATE_COMMENT,
					payload: { postId, commentId, content },
				});
			})
			.catch((error) => {
				console.log(error);
				if (error.response) {
					alert(error.response.data.message);
				}
			});
	};
};

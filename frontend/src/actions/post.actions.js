import axios from "axios";
//postS
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST_CONTENT = "UPDATE_POST_CONTENT";
export const UPDATE_POST_PIC = "UPDATE_POST_PIC";
export const DELETE_POST = "DELETE_POST";

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
			.catch((err) => console.log(err));
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
			.catch((err) => console.log(err));
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
			.catch((err) => console.log(err));
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
			})
			.catch((err) => console.log(err));
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
			.catch((err) => console.log(err));
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
			.catch((err) => console.log(err));
	};
};
//comments

import axios from "axios";
//postS
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPosts = () => {
	return (dispatch) => {
		return axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/post`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				dispatch({ type: GET_POSTS, payload: res.data });
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
//comments

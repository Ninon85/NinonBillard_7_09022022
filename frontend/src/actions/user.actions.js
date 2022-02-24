import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_JOB = "UPDATE_JOB";
export const UPDATE_EMAIL = "UPDATE_EMAIL";

//get a user from db
//id of user
export const getUser = (uId) => {
	//send to recucer
	return (dispatch) => {
		return axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/user/${uId}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				dispatch({ type: GET_USER, payload: res.data });
			})
			.catch((err) => console.log(err));
	};
};
export const uploadPicture = (data, id) => {
	//dispatche for send to the reducer
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/user/avatar/update/${id}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data,
		})
			.then((res) => {
				return axios({
					method: "get",
					url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
					headers: {
						authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}).then((res) => {
					dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar });
				});
			})
			.catch((err) => console.log(err));
	};
};
export const updateJob = (job, id) => {
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/user/job/update/${id}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: { job },
		})
			.then((res) => {
				dispatch({ type: UPDATE_JOB, payload: job });
			})
			.catch((err) => console.log(err));
	};
};
export const updateMail = (email, password, id) => {
	return (dispatch) => {
		return axios({
			method: "put",
			url: `${process.env.REACT_APP_API_URL}api/user/login/update/${id}`,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			data: { email, password },
		})
			.then((res) => {
				dispatch({ type: UPDATE_EMAIL, payload: email });
			})
			.catch((err) => console.log(err));
	};
};
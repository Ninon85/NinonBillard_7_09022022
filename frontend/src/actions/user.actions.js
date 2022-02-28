import axios from "axios";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_JOB = "UPDATE_JOB";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
//errors
export const UPLOAD_ERRORS = "UPLOAD_ERRORS";
export const UPLOAD_PICTURE_ERRORS = "UPLOAD_PICTURE_ERRORS";
export const UPDATE_JOB_ERRORS = "UPDATE_JOB_ERRORS";
export const UPDATE_EMAIL_ERRORS = "UPDATE_EMAIL_ERRORS";
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
					dispatch({ type: UPLOAD_ERRORS, payload: "" });
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: UPLOAD_ERRORS, payload: err.response.data });
			});
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
				// dispatch({ type: UPDATE_JOB_ERRORS, payload: "" });
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: UPDATE_JOB_ERRORS, payload: err.response.data });
			});
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

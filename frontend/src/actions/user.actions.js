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
	return async (dispatch) => {
		try {
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/user/${uId}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch({ type: GET_USER, payload: res.data });
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
export const uploadPicture = (data, id) => {
	//dispatche for send to the reducer
	return async (dispatch) => {
		try {
			await axios({
				method: "put",
				url: `${process.env.REACT_APP_API_URL}api/user/avatar/update/${id}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data,
			});
			const res = await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar });
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
export const updateJob = (job, id) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "put",
				url: `${process.env.REACT_APP_API_URL}api/user/job/update/${id}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: { job },
			});
			dispatch({ type: UPDATE_JOB, payload: job });
		} catch (error) {
			console.log(error);
			if (error.response.data.job) {
				alert(error.response.data.job.msg);
			} else if (error.response.data.message) {
				alert(error.response.data.message);
			} else if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};
export const updateMail = (email, password, id) => {
	return async (dispatch) => {
		try {
			await axios({
				method: "put",
				url: `${process.env.REACT_APP_API_URL}api/user/login/update/${id}`,
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				data: { email, password },
			});
			dispatch({ type: UPDATE_EMAIL, payload: email.toLowerCase() });
		} catch (error) {
			console.log(error);
			if (error.response.data.email) {
				alert(error.response.data.email.msg);
			} else if (error.response.data.message) {
				alert(error.response.data.message);
			} else if (error.response.status === 401) {
				localStorage.clear();
				window.location = "/";
			}
		}
	};
};

import {
	GET_USER,
	UPDATE_EMAIL,
	UPDATE_JOB,
	UPLOAD_PICTURE,
} from "../../actions/user.actions";

//info user connected
const initialState = {};
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		//incremente initialState
		case GET_USER:
			return action.payload;

		case UPLOAD_PICTURE:
			//spread operator for don't overwrite data o user and change avatar
			return { ...state, avatar: action.payload };

		case UPDATE_JOB:
			return { ...state, job: action.payload };
		case UPDATE_EMAIL:
			return { ...state, email: action.payload };

		default:
			return state;
	}
}

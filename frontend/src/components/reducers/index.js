import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import usersReducer from "./users.reducer";
// import errorReducer from "./error.reducer";

export default combineReducers({
	userReducer,
	postReducer,
	usersReducer,
	// errorReducer,
});

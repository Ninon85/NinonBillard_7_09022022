const express = require("express");
const path = require("path");
//import dotenv
require("dotenv").config();
//-----------------------
//router
//-----------------------
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");
//-----------------------//-----------------------//-----------------------//-----------------------//-----------------------//-----------------------

//create express application
const app = express();
//headers
app.use((req, res, next) => {
	//access to API from any origin "*"
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		//allow this headers for request send to the API
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		// allow request with this methods(CRUD)
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE"
	);
	next();
});

//to recover body request for read json files (convert into js object)
app.use(express.json());
//-----------------------------------
//Roads API
//-----------------------------------
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post", likeRoutes);
app.use("/api/comment", commentRoutes);
app.use("/images", express.static(path.join(__dirname, "public")));
// export app, now we can use this app from the other files of the project
module.exports = app;

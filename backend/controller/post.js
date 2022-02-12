const db = require("../models/index");
// const sequelize = require("sequelize");
exports.createPost = (req, res, next) => {
	postObject = { ...req.body };
	db.Post.create({ ...postObject })
		.then(() => res.status(201).json({ message: "Post crée" }))
		.catch((err) => res.status(400).json({ err }));
	console.log(postObject);
};

const db = require("../models/index");

exports.createUser = (req, res, next) => {
	const newUser = { ...req.body };
	db.User.create({ ...newUser })
		.then(() => res.status(201).json({ message: "Utilisateur crée" }))
		.catch((err) =>
			res.status(400).json({ message: "Echec création d'utilisateur" })
		);
	console.log(newUser);
};

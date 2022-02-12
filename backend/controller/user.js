const db = require("../models/index");
const bcrypt = require("bcrypt");

exports.createUser = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const newUser = {
				username: req.body.username,
				email: req.body.email,
				password: hash,
				job: req.body.job,
			};
			db.User.create({ ...newUser })
				.then(() => res.status(201).json({ message: "Utilisateur crée" }))
				.catch((err) =>
					res.status(400).json({ message: "Echec création d'utilisateur" })
				);
		})
		.catch((err) => res.status(500).json({ err }));
	console.log(newUser);
};

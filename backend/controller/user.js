const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			db.User.create({
				username: req.body.username,
				email: req.body.email,
				password: hash,
				avatar: `${req.protocol}://${req.get(
					"host"
				)}/public/defaultPicture/random-user.png`,
				job: req.body.job,
			})
				.then(() => res.status(201).json({ message: "Utilisateur crée" }))
				.catch((err) =>
					res.status(400).json({
						error: err.parent.errno,
						sqlMessage: err.parent.sqlMessage,
					})
				);
		})
		.catch((err) => res.status(500).json({ err }));
	// console.log(newUser);
};

//delete a user
exports.deleteUser = (req, res) => {
	db.User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: "Aucun utilisateur trouvé !" });
			}
			// if (user.id !== req.auth) {
			// 	res.status(403).json({ message: "Requête non autorisée !" });
			// }
			else {
				user
					.destroy()
					.then(() => {
						res.status(200).json({ message: "Compte supprimé avec succés" });
					})
					.catch((err) => res.satus(400).json({ err }));
			}
		})
		.catch((err) => res.status(500).json({ err }));
};
//login
exports.login = (req, res) => {
	db.User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(404).json({ message: "Utilisateur introuvable" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: user.id,
						token: jwt.sign(
							{
								userId: user.id,
								isAdmin: user.isAdmin,
							},
							process.env.TOKEN,
							{
								expiresIn: "6h",
							}
						),
					});
				})
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};
//update email
exports.updateLogin = (req, res) => {
	db.User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: "Utilisateur inconnu !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res
							.status(401)
							.json({ message: "Mot de passe incorrect !" });
					}

					user
						.update({ email: req.body.email })
						.then(() => res.status(200).json({ email: req.body.email }))
						.catch((err) => res.status(500).json({ err }));
				})
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};

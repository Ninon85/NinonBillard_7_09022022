const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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
				.then((user) => {
					const dirname = "picOf-" + user.id;
					fs.mkdir(`public/postPic/${dirname}`, () => {
						fs.mkdir(`public/profilPic/${dirname}`, () => {
							res.status(201).json({
								message:
									"Votre compte a été crée avec succés, vous pouvez desormais vous connecter ! ✔",
							});
						});
					});
				})
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
			// only the owner of account and the moderateur can delete account
			if (user.id !== req.auth.userId && req.admin.isAdmin === false) {
				return res.status(403).json({ message: "Requête non autorisée !!!" });
			} else {
				const dirname = user.id;
				fs.rmdir(
					`public/postPic/picOf-${dirname}`,
					{ recursive: true, force: true },
					() => {
						fs.rmdir(
							`public/profilPic/picOf-${dirname}`,
							{ recursive: true, force: true },
							() => {
								user
									.destroy()
									.then(() => {
										res
											.status(200)
											.json({ message: "Compte supprimé avec succés" });
									})
									.catch((err) => res.satus(400).json({ err }));
							}
						);
					}
				);
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
						return res
							.status(401)
							.json({ message: "Mot de passe incorrect !" });
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
//get 1 user
exports.getOneUser = (req, res) => {
	db.User.findOne({
		attributes: { exclude: ["password"] },
		where: { id: req.params.id },
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: "Utilisateur introuvable" });
			}
			res.status(200).json(user);
		})
		.catch((err) => res.status(500).json({ err }));
};
//get all users
exports.getAllUsers = (req, res, next) => {
	db.User.findAll({
		attributes: { exclude: ["password", "isAdmin"] },
	})
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(400).json({ err }));
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
			//only the owner of account and the moderateur can modify email address
			if (req.auth.userId !== user.id && req.admin.isAdmin === false) {
				return res.status(403).json({ message: "Requête non autorisée" });
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
//update job
exports.updateJob = (req, res) => {
	db.User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: "Utilisateur inconnu !" });
			}
			//only the owner of account and the moderateur can modify email address
			if (req.auth.userId !== user.id && req.admin.isAdmin === false) {
				return res.status(403).json({ message: "Requête non autorisée" });
			}

			user
				.update({ job: req.body.job })
				.then(() => res.status(200).json({ job: req.body.job }))
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};
exports.updateAvatar = (req, res) => {
	db.User.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(400).json({ message: "Utilisateur inconnu !" });
			}
			//only the owner of account and the moderateur can modify email address
			if (req.auth.userId !== user.id) {
				return res.status(403).json({ message: "Requête non autorisée" });
			}
			user
				.update({
					avatar: `${req.protocol}://${req.get(
						"host"
					)}/public/profilPic/picOf-${req.auth.userId}/${req.file.filename}`,
				})
				.then(() =>
					res.status(200).json({ message: "avatar mis à jour avec succés ! " })
				)
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};

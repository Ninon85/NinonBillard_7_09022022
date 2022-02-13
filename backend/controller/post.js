const db = require("../models/index");

exports.createPost = (req, res, next) => {
	const newPost = req.file ? { ...JSON.parse(req.body.post) } : { ...req.body };
	db.Post.create({ ...newPost })
		.then(() => res.status(201).json({ message: "Post crée" }))
		.catch((err) => res.status(400).json({ err }));
	// console.log(postObject);
};
exports.deletePost = (req, res) => {
	db.Post.findOne({
		where: { id: req.params.id },
	})
		.then((post) => {
			if (!post) {
				return res.status(400).json({ message: "Post inconnu !" });
			}
			if (post.userId === res.auth || req.admin === true) {
				//supprimer images eventuelles du post
				post
					.destroy()
					.then(() => res.status(200).json({ message: "Post supprimé !" }))
					.catch((err) => res.status(500));
			} else {
				return res.status(403).json({ message: "Requête non autorisée !" });
			}
		})
		.catch((err) => res.status(500).json({ err }));
};

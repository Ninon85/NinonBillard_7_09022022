const db = require("../models/index");
const fs = require("fs");

exports.createPost = (req, res, next) => {
	// console.log(req);
	if (req.body.content.trim().length === 0 && !req.file) {
		return res.status(400).json({
			message:
				"Un post ne peut pas être vide et ne peut pas contenir uniquement des caractères spéciaux, seuls les emoticônes sont acceptés",
		});
	}
	const newPost = req.file
		? {
				...JSON.parse(req.body.post),
				attachment: `${req.protocol}://${req.get(
					"host"
				)}/public/postPic/picOf-${req.auth.userId}/${req.file.filename}`,
		  }
		: { ...req.body };
	if (newPost.userId !== req.auth.userId) {
		return res.status(403).json({ message: "Requête non autorisée !! ❗" });
	}
	db.Post.create({ ...newPost })
		.then(() => res.status(201).json(newPost))
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
			// only the owner of account and the moderateur can delete a post
			if (post.userId !== req.auth.userId && req.admin.isAdmin === false) {
				return res.status(403).json({ message: "Requête non autorisée !!" });
			}
			if (post.attachment && post.attachment !== "") {
				//supprimer images eventuelles du post
				const imageToDelete = post.attachment.split(
					`/public/postPic/picOf-${post.userId}`
				)[1];
				fs.unlink(`public/postPic/picOf-${post.userId}/${imageToDelete}`, () =>
					console.log("image supprimée")
				);
			}

			post
				.destroy()
				.then(() => res.status(200).json({ message: "Post supprimé !" }))
				.catch((err) => res.status(400).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};
exports.updatePost = (req, res) => {
	const postUpdate = req.file
		? {
				...JSON.parse(req.body.post),
				attachment: `${req.protocol}://${req.get(
					"host"
				)}/public/postPic/picOf-${req.auth.userId}/${req.file.filename}`,
		  }
		: { ...req.body };
	if (postUpdate.content.trim().length === 0 && !req.file) {
		return res.status(400).json({
			message:
				"Un post ne peut pas être vide et ne peut pas contenir uniquement des caractères spéciaux, seuls les emoticons sont acceptés",
		});
	}
	db.Post.findOne({
		where: { id: req.params.id },
	})
		.then((post) => {
			if (!post) {
				return res.status(404).json({ message: "Post introuvable" });
			}
			if (req.auth.userId !== post.userId) {
				return res.status(403).json({ message: "Requête non autorisée !!" });
			}
			if (req.file && post.attachment !== "") {
				//delete the old picture
				const imageToDelete = post.attachment.split(
					`/public/postPic/picOf-${post.userId}`
				)[1];
				fs.unlinkSync(`public/postPic/picOf-${post.userId}/${imageToDelete}`);
			}
			db.Post.update({ ...postUpdate }, { where: { id: req.params.id } })
				.then(() =>
					res.status(200).json({ ...postUpdate, id: parseInt(req.params.id) })
				) //
				.catch((err) => res.status(400).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};
//get all posts with owner and post's likes and comments

exports.getAllPost = (req, res) => {
	db.Post.findAll({
		include: [
			{ model: db.User },
			{ model: db.Like },
			{ model: db.Comment, order: [["id", "ASC"]] },
		],
		//du plus recent au plus ancien
		order: [["id", "DESC"]],
	})
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};
// exports.getAPost = (req, res) => {
// 	db.Post.findOne({
// 		where: { id: req.params.id },
// 	})
// 		.then((post) => res.status(200).json(post))
// 		.catch((error) => res.status(400).json({ error }));
// };
///////////////test///////////////////////////////////
exports.getAllPostOfOneUser = (req, res) => {
	db.Post.findAll({
		where: { userId: req.params.userId },
		include: [
			{ model: db.User },
			{ model: db.Like },
			{ model: db.Comment, order: [["id", "ASC"]] },
		],
		//du plus recent au plus ancien
		order: [["id", "DESC"]],
	})
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

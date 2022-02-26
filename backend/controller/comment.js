const db = require("../models");

//create
exports.createComment = (req, res) => {
	const comment = { ...req.body };
	db.Comment.create({ ...comment })
		.then(() => res.status(201).json(comment))
		.catch((err) => res.status(400).json(err));
};
//get all comments of a post with owner of comment
exports.getAllCommentPost = (req, res) => {
	db.Comment.findAll({
		where: {
			postId: req.params.postId,
		},
		include: [
			{
				model: db.User,
			},
		],
	})
		.then((comments) => res.status(200).json(comments))
		.catch((error) => res.status(400).json({ error }));
};
//modify
//verifier que le user est le proprietaire du com

//delete
exports.deleteComment = (req, res) => {
	db.Comment.findOne({
		where: { id: req.params.id },
	})
		.then((comment) => {
			if (!comment) {
				return res.status(400).json({ message: "Commentaire introuvable !" });
			}
			//only the owner of comment or the moderateur can delete a com
			if (comment.userId !== req.auth.userId && req.admin.isAdmin === false) {
				return res.status(403).json({ message: "Requête non autorisée !!!" });
			}
			comment
				.destroy()
				.then(() => res.status(200).json({ message: "Commentaire supprimé" }))
				.catch((err) => res.status(400).json({ err }));
		})
		.catch((err) => res.status(500).json(err));
};

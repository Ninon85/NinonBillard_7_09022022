const db = require("../models");

//create
exports.createComment = (req, res) => {
	if (req.body.content.trim().length === 0)
		return res.status(400).json({
			message:
				"Saisie incorrecte, vous ne pouvez pas saisir uniquement des caractères spéciaux",
		});
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
exports.updateComment = (req, res) => {
	if (req.body.content.length === 0) {
		return res.status(400).json({
			message:
				"Un post ne peut pas être vide et ne peut pas contenir uniquement des caractères spéciaux, seuls les emoticons sont accéptés",
		});
	}
	db.Comment.findOne({
		where: {
			id: req.params.id,
		},
	}).then((comment) => {
		if (!comment)
			return res.status(404).json({ message: "Commentaire inconnu !" });
		if (req.auth.userId !== comment.userId)
			return res.status(403).json({ message: "Requête non autorisée" });
		comment
			.update({ content: req.body.content })
			.then(() => res.status(200).json(req.body.content));
	});
};
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

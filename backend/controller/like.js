const db = require("../models/index");
exports.likeStatus = (req, res, next) => {
	db.Like.findOne({
		//find userId from middleware auth
		where: { userId: req.auth.userId, postId: req.params.id },
	})
		.then((like) => {
			// unlike if userId has ever like the post
			if (like) {
				db.Like.destroy({
					where: { userId: req.auth.userId, postId: req.params.id },
				})
					.then(() =>
						res.status(200).json({
							message: "Vous avez unlike le post !",
						})
					)
					.catch((err) => res.status(400).json(err));
				//if userId isn't in the array like +1
			} else {
				db.Like.create({
					postId: req.params.id,
					userId: req.auth.userId,
					likes: req.body.likes,
				})
					.then(() => res.status(201).json({ message: "Like enregistré" }))
					.catch((err) => res.status(400).json({ err }));
			}
		})
		.catch((err) => res.status(500).json({ err }));
};
exports.numberOfLikes = (req, res) => {
	db.Like.count({
		where: { postId: req.params.id },
	})
		.then((number) => res.status(200).json({ number }))
		.catch((err) => res.status(400).json(err));
};

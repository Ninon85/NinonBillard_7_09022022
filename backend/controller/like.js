const db = require("../models/index");
exports.likeStatus = (req, res, next) => {
	const likes = req.body.likes;
	const userId = req.body.userId;
	// on cherche la sauce sélectionnée
	db.Like.findOne({
		where: { userId: req.body.userId, postId: req.params.id },
	})
		.then((like) => {
			// unlike
			if (like && likes === 0) {
				db.Like.destroy({
					where: { userId: req.body.userId, postId: req.params.id },
				})
					.then(() =>
						res.status(200).json({
							message: "Vous avez unlike le post !",
						})
					)
					.catch((err) => res.status(400).json(err));
				//if userId isn't in the array like +1
			} else if (!like && likes === 1) {
				db.Like.create({
					postId: req.params.id,
					userId: req.body.userId,
					likes: req.body.likes,
				})
					.then(() => res.status(201).json({ message: "Like enregistré" }))
					.catch((err) => res.status(400).json({ err }));
			} else {
				return res.status(400).json({ err });
			}
		})
		.catch((err) => res.status(500).json({ err }));
};

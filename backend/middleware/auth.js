const jwt = require("jsonwebtoken");
const db = require("../models/index");
module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN);

		const userId = decodedToken.userId;
		const isAdmin = decodedToken.isAdmin;

		req.admin = { isAdmin };
		const user = await db.User.findOne({
			where: {
				id: userId,
			},
		});
		if (!user) {
			return res
				.status(401)
				.json({ message: `l'id : ${userId} n'existe pas.` });
		}
		//if there is an userId in the body's request and if userId is the not same than in the token
		else if (req.body.userId && req.body.userId !== userId) {
			return res.status(403).json({ message: "Requête non autorisée 🔑" });
		} else {
			req.auth = { userId };
			next();
		}
	} catch (err) {
		res.status(401).json({ message: "Requête non authentifiée !" });
	}
};

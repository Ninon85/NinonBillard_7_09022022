const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN);

		const userId = decodedToken.userId;
		const isAdmin = decodedToken.isAdmin;
		req.auth = { userId };
		req.admin = { isAdmin };
		//if there is an userId in the body's request and if userId is the not same than in the token
		if (req.body.userId && req.body.userId !== userId) {
			return res.status(403).json({ message: "Requête non autorisée 🔑" });
		} else {
			next();
		}
	} catch (err) {
		res.status(401).json({ message: "Requête non authentifiée" });
	}
};

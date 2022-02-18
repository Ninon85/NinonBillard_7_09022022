const { body, validationResult } = require("express-validator");
const passwordValidator = require("password-validator");

exports.email = [
	body("email")
		.notEmpty()
		.isEmail()
		.normalizeEmail({ lowercase: true })
		.withMessage("Format email invalide !"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json(errors.mapped());
		}
		next();
	},
];
exports.password = (req, res, next) => {
	// Create a schema
	var schema = new passwordValidator();
	schema
		.is()
		.min(8) // Minimum length 8
		.is()
		.max(15) // Maximum length 100
		.has()
		.uppercase() // Must have uppercase letters
		.has()
		.lowercase() // Must have lowercase letters
		.has()
		.digits(2) // Must have at least 2 digits
		.has()
		.not()
		.spaces(); // Should not have spaces
	const password = req.body.password;
	if (schema.validate(password)) {
		next();
	} else {
		return res.status(422).json({
			message:
				"Le mot de passe doit faire entre 8 et 15 caractères, comprenant  au moins 1 lettre majuscule 1 minuscule et 2 chiffres SANS caractères spéciaux. ",
		});
	}
};
exports.name = [
	body("username")
		.notEmpty()
		.isLength({ min: 3 })
		.withMessage("Minimum 3 caractères !")
		//this char will not be records in db
		.blacklist("{}$<>=")
		.isAlpha("fr-FR", { ignore: " -" })
		.withMessage(
			"Votre nom de doit pas contenir de chiffres ni caractères spéciaux"
		),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json(errors.mapped());
		}
		next();
	},
];
exports.job = [
	body("job")
		.notEmpty()
		.isLength({ min: 4 })
		.withMessage("Minimum 4 caractères !")
		.blacklist("{}$<>=")
		.isAlpha("fr-FR", { ignore: " -" })
		.withMessage(
			"Le champ ne doit pas contenir de chiffres ni caractères spéciaux"
		),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json(errors.mapped());
		}
		next();
	},
];
exports.content = [
	body("content")
		// .notEmpty()
		// .isLength({ min: 4 })
		// .withMessage("Minimum 4 caractères !")
		.blacklist("{}$<>="),
	// .isAlpha("fr-FR", { ignore: " -" })
	// .withMessage(
	// 	"Le champ ne doit pas contenir de chiffres ni caractères spéciaux"
	// )
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json(errors.mapped());
		}
		next();
	},
];
exports.contentComment = [
	body("content")
		.notEmpty()
		.isLength({ min: 2 })
		.withMessage("Minimum 2 caractères !")
		.blacklist("{}$<>=*")
		.withMessage("❗❗ Certains caractères spéciaux seront supprimés !"),
	// .isAlpha("fr-FR", { ignore: " -" })
	// .withMessage(
	// 	"Le champ ne doit pas contenir de chiffres ni caractères spéciaux"
	// ),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json(errors.mapped());
		}
		next();
	},
];

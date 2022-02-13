const { body, validationResult } = require("express-validator");
const passwordValidator = require("password-validator");
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

exports.email = [
	body("email")
		.notEmpty()
		.isEmail()
		.normalizeEmail()
		.withMessage("Format email invalide !"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
		next();
	},
];
exports.password = (req, res, next) => {
	const password = req.body.password;
	if (schema.validate(password)) {
		next();
	} else {
		return res.status(422).json({
			message:
				"Le mot de passe doit faire entre 8 et 20 caractères, comprenant  au moins 1 lettre majuscule 1 minuscule et 2 chiffres SANS caractères spéciaux. ",
		});
	}
};

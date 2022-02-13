const router = require("express").Router();
const userCtrl = require("../controller/user");
const inputsValidation = require("../middleware/inputsValidation");
//create 1 user
router.post(
	"/signup",
	inputsValidation.email,
	inputsValidation.password,
	userCtrl.createUser
);
//login
router.post(
	"/login",
	inputsValidation.email,
	inputsValidation.password,
	userCtrl.login
);
//delete 1 user
router.delete("/unsubscribe/:id", userCtrl.deleteUser);
//update email
router.put(
	"/login/update/:id",
	inputsValidation.email,
	inputsValidation.password,
	userCtrl.updateLogin
); //ajouter auth middleware
module.exports = router;

const router = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controller/user");
const inputsValidation = require("../middleware/inputsValidation");
const multer_avatar = require("../middleware/multer_ProfilPic");

//create 1 user
router.post(
	"/signup",
	inputsValidation.name,
	inputsValidation.email,
	inputsValidation.password,
	inputsValidation.job,
	userCtrl.createUser
);
//login
router.post(
	"/login",
	inputsValidation.email,
	inputsValidation.password,
	userCtrl.login
);

//delete 1 user auth,
router.delete("/unsubscribe/:id", auth, userCtrl.deleteUser);
//update email
router.put(
	"/login/update/:id",
	auth,
	inputsValidation.email,
	inputsValidation.password,
	userCtrl.updateLogin
);
//update job
router.put("/job/update/:id", auth, inputsValidation.job, userCtrl.updateJob);
//update avatar
router.put("/avatar/update/:id", auth, multer_avatar, userCtrl.updateAvatar);
//get 1 user
router.get("/:id", auth, userCtrl.getOneUser);
//get all users
router.get("/", auth, userCtrl.getAllUsers);
module.exports = router;

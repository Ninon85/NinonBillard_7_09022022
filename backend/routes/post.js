const router = require("express").Router();
const postCtrl = require("../controller/post");
const auth = require("../middleware/auth");
const inputsValidation = require("../middleware/inputsValidation");
const multerPost = require("../middleware/multer_config_post");
//create 1 post
router.post(
	"/",
	auth,
	inputsValidation.content,
	multerPost,
	postCtrl.createPost
);
//get all post whith owner and like post
router.get("/", auth, postCtrl.getAllPost);
// //get 1 post
// router.get("/:id", auth, postCtrl.getAPost);
//update 1 post
router.put(
	"/:id",
	auth,
	inputsValidation.content,
	multerPost,
	postCtrl.updatePost
);
//delete 1 post
router.delete("/:id", auth, postCtrl.deletePost);
//get all posts 1 user
router.get("/:userId", auth, postCtrl.getAllPostOfOneUser);
module.exports = router;

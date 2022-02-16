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
//get all post
router.get("/");
//update 1 post
router.put("/:id", auth, multerPost, postCtrl.updatePost);
//delete 1 post
router.delete("/:id", auth, postCtrl.deletePost);
module.exports = router;
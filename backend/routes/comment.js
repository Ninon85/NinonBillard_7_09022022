const router = require("express").Router();
const commentCtrl = require("../controller/comment");
const auth = require("../middleware/auth");
const inputsValidation = require("../middleware/inputsValidation");
//get all comment of a post
// router.get("/:postId", auth, commentCtrl.getAllCommentPost);
//create a comment
router.post(
	"/",
	auth,
	inputsValidation.contentComment,
	commentCtrl.createComment
);
//update a comment
router.put(
	"/:id",
	auth,
	inputsValidation.contentComment,
	commentCtrl.updateComment
);
//delete a comment
router.delete("/:id", auth, commentCtrl.deleteComment);
module.exports = router;

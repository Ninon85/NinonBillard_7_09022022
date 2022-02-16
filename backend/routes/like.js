const router = require("express").Router();
const likeCtrl = require("../controller/like");
const auth = require("../middleware/auth");
// create a like for a post
router.post("/:id/like", auth, likeCtrl.likeStatus);
//get number of like for a post
router.get("/:id/like", auth, likeCtrl.numberOfLikes);
module.exports = router;

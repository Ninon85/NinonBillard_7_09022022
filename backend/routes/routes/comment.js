const router = require("express").Router();
const commentCtrl = require("../controller/comment");
router.post("/:id/comment");
router.put("/:id/comment");
router.delete("/:id/comment");
module.exports = router;

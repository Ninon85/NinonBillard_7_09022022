const router = require("express").Router();
const likeCtrl = require("../controller/like");
const like = require("../models/like");
router.post("/:id/like", likeCtrl.likeStatus);
module.exports = router;

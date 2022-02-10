const router = require("express").Router();
const postCtrl = require("../controller/post");
router.post("/", postCtrl.createPost);
router.get("/");
router.get("/:id");
router.put("/id");
router.delete("/:id");
module.exports = router;

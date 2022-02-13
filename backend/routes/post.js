const router = require("express").Router();
const postCtrl = require("../controller/post");
//create 1 post
router.post("/", postCtrl.createPost);
//get all post
router.get("/");
//get 1 post
router.get("/:id");
//update 1 post
router.put("/id");
//delete 1 post
router.delete("/:id");
module.exports = router;

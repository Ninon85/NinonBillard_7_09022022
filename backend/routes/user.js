const router = require("express").Router();
const userCtrl = require("../controller/user");
router.post("/signup");
router.post("/login");
router.delete("/unsubscribe");
module.exports = router;

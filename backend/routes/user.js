const router = require("express").Router();
const userCtrl = require("../controller/user");
router.post("/signup", userCtrl.createUser);
router.post("/login", userCtrl.login);
router.delete("/unsubscribe/:id", userCtrl.deleteUser);
router.put("/login/update/:id", userCtrl.updateLogin); //ajouter auth middleware
module.exports = router;

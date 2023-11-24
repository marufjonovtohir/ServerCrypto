const router =require("express").Router()

const userCtrl = require("../controller/userCtrl")

router.post("/signup",userCtrl.signup)
router.post("/login", userCtrl.login)
router.get('/allusers',userCtrl.getAllUsers)

module.exports = router
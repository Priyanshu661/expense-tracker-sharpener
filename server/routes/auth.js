const express=require("express")
const { signup, login, forgot_password } = require("../controllers/auth")


const router=express.Router()




router.post("/signup", signup);
router.post("/login", login);
router.post("/password/forgotpassword", forgot_password);




module.exports=router
const express = require("express");
const {
  register,
  login,
  loginusername,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/loginusername/:token", loginusername);
module.exports = router;

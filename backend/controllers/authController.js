const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
module.exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(403)
        .json({ success: false, message: "User already registered !" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      email: req.body.email,
      password: hash,
    });

    const saved_user = await newUser.save();
    const token = jwt.sign({ id: saved_user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ success: true, message: "Successfull created", newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return res
        .status(403)
        .json({ success: false, message: "Password is Incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ success: true, message: "Login Successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports.loginusername = async (req, res) => {
  const token = req.params.token;
  try {
    const decoded_value = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded_value) {
      req.userID = decoded_value.id;
      console.log("User authenticated successfully");
    } else {
      res.status(403).json({ msg: "You are not authenticated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Incorrect inputs",
    });
  }
  const user = await User.findOne({ _id: req.userID });
  res.status(200).json({
    email: user.email,
  });
};

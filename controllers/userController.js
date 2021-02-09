const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_TOKEN, {
    expiresIn: "7d",
  });
};

module.exports.registerValidations = [
  body("name").not().isEmpty().trim().withMessage("Mane is required."),
  body("email").not().isEmpty().trim().withMessage("Email is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long."),
];

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ message: "Email is already taken." }] });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        name,
        email,
        password: passwordHash,
      });
      const token = createToken(user);
      return res
        .status(200)
        .json({ message: "Your account has been created.", token });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

module.exports.loginValidations = [
  body("name").not().isEmpty().trim().withMessage("Mane is required."),
  body("email").not().isEmpty().trim().withMessage("Email is required."),
];

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const method = await bcrypt.compare(password, user.password);
      if (method) {
        const token = createToken(user);
        return res
          .status(200)
          .json({ message: "You have login successfully.", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ message: "Password is not correct." }] });
      }
    } else {
      return res
        .status(404)
        .json({ errors: [{ message: "Email not found." }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error.message });
  }
};

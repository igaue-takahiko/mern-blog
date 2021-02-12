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
  body("name").not().isEmpty().trim().withMessage("名前入力は必須です。"),
  body("email").not().isEmpty().trim().withMessage("メールアドレス入力は必須です。"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("パスワードは６文字以上でお願いします。"),
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
        .json({ errors: [{ msg: "Email is already taken." }] });
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
        .json({ msg: "あなたのアカウントが作成されました。", token });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.loginValidations = [
  body("email").not().isEmpty().trim().withMessage("メールアドレス入力は必須です。"),
  body("password").not().isEmpty().withMessage("パスワード入力は必須です。")
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
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const token = createToken(user);
        return res
          .status(200)
          .json({ msg: "ログインに成功しました。", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "パスワードが正しくありません。" }] });
      }
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: "該当するメールアドレスがありません。" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

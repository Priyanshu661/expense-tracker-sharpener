const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const sequilize = require("../database/db");
const { emailSender } = require("../miscellaneous/email_sender");

const signup = async (req, res) => {
  const t = await sequilize.transaction();
  try {
    const { name, email, phone, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
      transaction: t,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    await User.create(
      {
        name,
        email,
        phone,
        password: hashedPassword,
      },
      {
        transaction: t,
      }
    );

    t.commit();

    return res.status(200).json({ message: "Account Created" });
  } catch (e) {
    console.log(e);
    await t.rollback();
    return res.status(400).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  const t = await sequilize.transaction();
  try {
    const { email, password } = req.body;

    console.log(req.headers.Authorization);

    const user = await User.findOne({
      where: {
        email: email,
      },
      transaction: t,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const token = await jwt.sign(
      { userId: user.id, isPremium: user.isPremium },
      "thisismysecretkey"
    );

    await t.commit();

    return res.status(200).json({
      message: "Login Successfull",
      token,
      isPremium: user.isPremium,
    });
  } catch (e) {
    console.log(e);
    await t.rollback();
    return res.status(400).json({ message: "Server Error" });
  }
};

const forgot_password = async (req, res) => {
  const t = await sequilize.transaction();
  try {
    const { email } = req.body;

    const msg = await emailSender(email);

    console.log(msg);

    await t.commit();

    return res.status(200).json({
      message: "Email Sent",
    });
  } catch (e) {
    console.log(e);
    await t.rollback();
    return res.status(400).json({ message: "Server Error" });
  }
};

module.exports = {
  signup,
  login,
  forgot_password,
};

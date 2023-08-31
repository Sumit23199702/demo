const UserModel = require("../models/userModel");
const { isValid, isValidBody } = require("./validator");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Email Validation
    if (!isValid(email)) {
      return res.status(400).send({ msg: "Email is Required" });
    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
      return res
        .status(400)
        .send({ status: false, message: " Email should be a valid" });
    }

    let duplicate = await UserModel.findOne({ email });
    if (duplicate) {
      return res.status(400).send({ msg: "Email Already Exist" });
    }

    // Password Validation
    if (!isValid(password)) {
      return res.status(400).send({ msg: "Password is Required" });
    }

    let registerUser = await UserModel.create({ email, password });
    return res.status(201).send({
      status: true,
      msg: "User Registered Sucessfully",
      data: registerUser,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// ----------- Login User -------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidBody(req.body)) {
      return res.status(400).send({ status: "false", msg: "No Data Provided" });
    }

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: "false", msg: "Email is Required" });
    }
    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: "false", msg: "Password is Required" });
    }

    const findUser = await UserModel.findOne({ email, password });
    if (!findUser) {
      return res.status(404).send({ status: "false", msg: "User Not Found" });
    }

    const token = jwt.sign({ id: findUser._id }, "secretkey");
    res.json({
      token,
      userID: findUser._id,
      message: "User Logged in successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


module.exports = { createUser, loginUser };

const StudentModel = require("../models/studentModel");
const { isValid, isValidBody } = require("./validator");

const createStudent = async (req, res) => {
  try {
    let data = req.body;
    if (!isValidBody(data)) {
      return res.status(404).send({ status: "false", msg: "No Data Provided" });
    }
    let { Name, USN, Age, Gender, Email, Mobile } = data;

    // Name Validation
    if (!isValid(Name)) {
      return res
        .status(400)
        .send({ status: false, message: "Name is required." });
    }

    if (!/^[a-zA-Z ]*$/.test(Name)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter a valid Name" });
    }

    // USN Validation
    if (!isValid(USN)) {
      return res
        .status(400)
        .send({ status: false, message: "USN is required." });
    }

    let duplicate = await StudentModel.findOne({ USN });
    if (duplicate) {
      return res.status(400).send({ msg: "USN Already Exist" });
    }

    // Age Validation
    if (!isValid(Age)) {
      return res
        .status(400)
        .send({ status: false, message: "Age is required." });
    }

    // Gender Validation
    if (!isValid(Gender)) {
      return res
        .status(400)
        .send({ status: false, message: "Gender is required." });
    }

    // Email Validation
    if (!isValid(Email)) {
      return res.status(400).send({ status: false, msg: "Email is Required" });
    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(Email)) {
      return res
        .status(400)
        .send({ status: false, message: " Email should be a valid" });
    }

    let duplicateMail = await StudentModel.findOne({ Email });
    if (duplicateMail) {
      return res
        .status(400)
        .send({ status: false, msg: "Email Already Exist" });
    }

    // Mobile Validation
    if (!isValid(Mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "Mobile Number is Required" });
    }

    if (
      !/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
        Mobile
      )
    ) {
      return res
        .status(400)
        .send({ status: false, message: " Mobile Number should be a valid" });
    }

    let createData = await StudentModel.create(data);
    return res.status(201).send({
      status: true,
      msg: "Student Data Created Sucessfully",
      data: createData,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
module.exports = { createStudent };

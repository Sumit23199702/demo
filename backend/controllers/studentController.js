const StudentModel = require("../models/studentModel");
const { isValid, isValidBody } = require("./validator");

const createStudent = async (req, res) => {
  try {
    let data = req.body;
    if (!isValidBody(data)) {
      return res.status(404).send({ status: "false", msg: "No Data Provided" });
    }
    let { Name, USN, Age, Gender, Email, Mobile } = data;
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

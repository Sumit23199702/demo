const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/route");

const app = express();
app.use(express.json());
app.use("/", route);
app.use(cors());

// DB Connection
mongoose
  .connect("mongodb+srv://Sumit001:Sumit001@cluster0.axpuyca.mongodb.net/CS_4B")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3500, () => {
  console.log("Server Connected on 3500");
});

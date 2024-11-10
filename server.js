const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/User");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/nara")
  .then(() => console.log("connected to the database successfully!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Welcome to Nara!",
  });
});

app.get("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      name: "sunaina Bharti",
      email: "sunaindsatk@fmail.com",
      phone: "+918409575848",
      password: "12345678",
    });

    newUser.password = undefined;

    res.status(200).json({
      status: "OK",
      message: newUser,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMsgs = Object.values(error.errors).map((el) => el.message);
      res.status(400).json({
        status: "FAIL",
        message: errorMsgs,
      });
    }else if (error.code===11000){
        const fieldName = Object.keys(error.keyValue)[0];
        const value = error.keyValue[fieldName]; 
        res.status(400).json({
            status: "FAIL",
            message: `The ${fieldName} ${value} has already been taken!`
        });
    } 
    else {      
      res.send("Ruko jra sbr kro!");
    }
  }
});

const validator = require("validator");

app.listen(8080, () => {
  console.log("Server is listening on port 8080.");
});

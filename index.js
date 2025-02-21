const express = require("express");
const mongoose = require("mongoose");

//steps
//1 - connect mongoose(url and database name ............use mongosh in cmd and find url from there )
//schema - define the schema
// schema se model banate h- name of the collection
//using model we do crud operations

const app = express();
const port = 1001
;

const URL = //127.0.0.1:27017/
  app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });

//middleware
app.use(express.json()); // JSON data parse karne ke liye
//req header se data bhejna

//connect
mongoose
  .connect("mongodb://127.0.0.1:27017/Aniruddha-Database") //returns promises
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((err) => {
    console.log("Error occured ");
  });

//schema
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String, //when you set required = true, it is compulsory to type or insert the said value
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//model
const User = mongoose.model("Users", UserSchema); // returns the user (class)


//crud

app.post("/api/create/users", async (req, res) => {
  try {
    console.log("Incoming Request:", req.body);

    const { firstname, lastname, email, phoneNumber, password } = req.body;
    
    if (!firstname || !email || !phoneNumber || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
    });

    console.log("User Created:", newUser);

    res.status(200).json({ message: "User Created Successfully", user: newUser });
  } catch (error) {
    console.error("Error in user creation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


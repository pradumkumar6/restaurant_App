const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const Person = require("./models/person");
const Menu = require("./models/menu");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

app.get("/", function (req, res) {
  res.send("Hii this is the root page.");
});

// // POST route to add the menuItem
// app.post("/menu", async (req, res) => {
//   try {
//     const menu = req.body; // Jo data client se aa raha hai wo sabse pehle body parser ke pass jayega and then body parser us data ko body me save kar lega.
//     // To add the new person in our database we have to make first a newPerson which will be the type of Person
//     const newItem = new Menu(menu);
//     // Now we have to save this newPerson in to our database
//     const response = await newItem.save();
//     console.log("Data saved successfully.");
//     res.status(200).json(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// });

// // GET Route to retreive the data from the database
// app.get("/menu", async (req, res) => {
//   try {
//     const menu = await Menu.find();
//     console.log("Data fetched successfully.");
//     res.status(200).json(menu);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error." });
//   }
// });

// Import the person routes
const personRoutes = require("./routes/personRoutes");
// Use the routers
app.use("/person", personRoutes);
const menuRoutes = require("./routes/menuRoutes");
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} `);
});
// const notes = require("./notes");
// var _ = require("lodash");
// var age = notes.age;
// console.log(age);

// // lodash give the unique data from the given database
// var data = ["person", "person", "person", 1, 1, 1, 2, 2, 3, "age"];
// var filter = _.uniq(data);
// console.log(filter);
// var fs = require("fs");
// var os = require("os");
// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile("hello.txt", "Hii" + user.username + "!", () => {
//   // Filename,data and callback function
//   console.log("File is created successfully.");
// });

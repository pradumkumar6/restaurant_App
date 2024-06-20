const express = require("express");
const router = express.Router();
const Person = require("../models/person");

// POST route to add the person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Jo data client se aa raha hai wo sabse pehle body parser ke pass jayega and then body parser us data ko body me save kar lega.
    // To add the new person in our database we have to make first a newPerson which will be the type of Person
    const newPerson = new Person(data);
    // Now we have to save this newPerson in to our database
    const response = await newPerson.save();
    console.log("Data saved successfully.");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// GET Route to retreive the data from the database
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched successfully.");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Find the person according to their worktype
router.get("/:workType", async (req, res) => {
  try {
    // Extract the work type from the URL parameter
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("Data fetched successfully.");
      res.status(200).json(response);
    } else {
      console.log("Please enter the invalid work type.");
      res.status(404).json({ error: "Invalid work type." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Update the person details
router.put("/:id", async (req, res) => {
  try {
    // Sabse pehle hume person ke get karna hai jisko update karna hai by any of the unique identifier
    // Then hume kis object ko update karna hai usko find karna hai
    const personId = req.params.id;
    const updatedPerson = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
      new: true, //Return the updated document
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "Person Not Found😢." });
    }
    console.log("Data Updated Successfully.");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Delete the perosn from the databases
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Person.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ error: "Person Not Found😢." });
    }
    console.log("Data Deleted Successfully.");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});
module.exports = router;

const expres = require("express");
const router = expres.Router();
const Menu = require("../models/menu");

// POST route to add the menuItem
router.post("/", async (req, res) => {
  try {
    const menu = req.body; // Jo data client se aa raha hai wo sabse pehle body parser ke pass jayega and then body parser us data ko body me save kar lega.
    // To add the new person in our database we have to make first a newPerson which will be the type of Person
    const newItem = new Menu(menu);
    // Now we have to save this newPerson in to our database
    const response = await newItem.save();
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
    const menu = await Menu.find();
    console.log("Data fetched successfully.");
    res.status(200).json(menu);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

// Find the person according to their worktype
router.get("/:tasteType", async (req, res) => {
  try {
    // Extract the work type from the URL parameter
    const tasteType = req.params.tasteType;
    if (tasteType == "spicy" || tasteType == "sweet" || tasteType == "sour") {
      const response = await Menu.find({ taste: tasteType });
      console.log("Data fetched successfully.");
      res.status(200).json(response);
    } else {
      console.log("Please enter the invalid taste type.");
      res.status(404).json({ error: "Invalid taste type." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
// Above 2 lines are required

// we will fetch this at here instead of index.js file because we are using Person Model here to insert and fetch the person data
const Person = require("./../models/person");

// same thing as in the index.js but here we will use router.post  and
// instead of /person  we will only use /
// But in web Browser it will be fetched at http://localhost:3000/person  b'coz /person is directly passed in index.js file
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const savedPerson = await newPerson.save(); // savedPerson will wait till data gets saved

    console.log("Data Saved Successfully");
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the person from database
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched Successfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Data Not Fetched" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameters
    // Firstly validate the work type
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// here id will be sent by user
router.put("/:id", async (req, res) => {
  // here id is variable and it depends on myself
  try {
    const personId = req.params.id; // Extract the id from the URL parameters
    const updatedPersonData = req.body;
    // in req.params it will get data from parameter  and  in req.body it will get enterd data from user
    
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // run mongoose validation
      }
    );

    if(!response){    // if the given id is invalid
      return res.status(404).json({ error: "Person Not found"});
    }

    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id" , async (req , res) => { 
  try{
    const persnId = req.params.id;

    // findbyIdAndDelete() is inbuild function in mongoDB
    // const response = await Person.findByIdAndRemove(persnId);    // here findByIdAndRemove() is not working
    const response = await Person.findByIdAndDelete(persnId);
    
    if(!response){    // if the given id is invalid
      return res.status(404).json({ error: "Person Not found"});
    }
    
    console.log("Data Deleted");
    res.status(200).json({message : "Person Deleted Successfully"});
  }
  catch(err){
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router;

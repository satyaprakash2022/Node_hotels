// var os = require('os');
// var fs = require('fs');

// var user = os.userInfo();
// console.log(user)
// console.log(user.username)

// fs.appendFile('greetings.txt' , 'Hello ' + user.username +'!' , () =>{
//     console.log("data inserted")
// })
// here function is callback function

// .............
// var notes = require('./notes.js');

// console.log(notes.add);
// var p = notes.addNumber(12,34);
// console.log(p);
// ..............

// create a server
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // it will stores the entered data from user into req.body

const db = require("./db");
require('dotenv').config();

// const Person = require("./models/person");

app.get("/", function (req, res) {
  res.send("Welcome");
});
// /noodles and /name is for learning purpose only
// app.get("/noodles", function (req, res) {
//   res.send("Sure sir");
// });
// app.get("/name", function (req, res) {
//   var na = {
//     name: "satya",
//     age: 20,
//   };
//   res.send(na);
// });
//.......

// app.post('/person', function (req, res){
//     const data = req.body  // Assuming the (req.body) contains the person data  (bodyParser stores entered data into req.body)

//     // creates a new person document using the Mongoose model
//     // const newPerson = new Person();
//     // newPerson.name = data.name
//     // newPerson.age = data.age
//     // newPerson.email = data.email
//     // newPerson.mobile = data.mobile
//     // newPerson.address = data.address
//     //             or
//     const newPerson = new Person(data)

//     // save the newPerson to database
//     newPerson.save((error , savedPerson) => {
//         if(error){
//             console.log('Error saving person : ',error)
//             res.status(500).json({error: 'Internal Server Error'})
//         }
//         else{
//             console.log('Data Saved Successfully')
//             res.status(200).json(savedPerson)
//         }
//     })

//     // saving will give the error because now'a'days no one are using callback function this will looks like more complex
//     // Therefore we are using async and await

// })
//             or
// app.post("/person", async (req, res) => {
//   try {
//     const data = req.body;

//     const newPerson = new Person(data);
//     const savedPerson = await newPerson.save(); // savedPerson will wait till data gets saved

//     console.log("Data Saved Successfully");
//     res.status(200).json(savedPerson);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // GET method to get the person from database
// app.get("/person", async (req, res) => {
//   try {
//     const data = await Person.find();
//     console.log("Data fetched Successfully");
//     res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Data Not Fetched" });
//   }
// });

// CRUD operations
// C   ->    Create    -> POST
// R   ->    Read      -> GET
// U   ->    Update    -> PUT/PATCH
// D   ->    Delete    -> DELETE

// similarly create for menu items

// .....
// Now we want to find details of each person a/c to their worktype
// /person/chef    for only chef users
// /person/waiter    for only waiter users
// But this is not the correct method to create as many finctions here we can use parameteried endpoints
// It can dynamically inserted into the URL when making a request to the API
// for eg:   http://localhost:3000/person/:work
//  ----> work = ['chef' , 'waiter' , 'manager']

// variable endpoints(parameterized endpoint)
// app.get("/person/:workType", async(req, res) => {
//   try {
//     const workType = req.params.workType; // Extract the work type from the URL parameters
//     // Firstly validate the work type
//     if (workType == "chef" || workType == "waiter" || workType == "manager") {
//         const response = await Person.find({work: workType}); 
//         console.log('response fetched');
//         res.status(200).json(response)
//     } 
//     else {
//       res.status(404).json({ error: "Invalid work type" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error:'Internal Server Error' });
//   }
// });
// Now at endpoint /person/chef   we will get those records whose workType is chef

// Express Router 
// we have a lot of endpoints in a single file index.js
// This makes bad experience in code readability as well as code handling
// Express Router is a way to modularize and organize our route handling code in an express.js application
// So let's create a separate file to manage endpoints /person and /menu
// Express Router is like a traffic cop for our web server
// Express Router helps us to organize and manage these pages or endpoints in our web application . it's like creating separate folders for different types of tasks

const personRoutes = require('./routes/personRoutes');
// app.use('/' , personRoutes)
app.use('/person' , personRoutes)  // here we will use /person so that the personROutes endpoints will be fetched after /person

const PORT = process.env.PORT || 3000;  // first it will check port from env file if not then it will use 3000 port
app.listen(PORT , () =>{
  console.log('listening on port');
});

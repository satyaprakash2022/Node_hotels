// step 1 : Install and import mongoose module
const mongoose = require('mongoose')

// step 2 : connect to Mongoose
const mongoURL = 'mongodb://localhost:27017/practice_node'   // practice_node is the name of database

// step 3 : set up the mongoDB Connection
mongoose.connect(mongoURL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// above line are optional but if we will not use them then it will give warning and might not connect with database


// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;
// we will use this(object) db to interact with database

// define event listener for eg: .on('connected', ....) , .on('disconnected', ...) , .on('error', ...)
// we the help of event listener we can notify that database is connected or not

db.on('connected', () =>{
    console.log('Connected to MongoDB server')
})
db.on('error', (err) =>{
    console.log('MongoDB Connection Error : ',err)
})
db.on('disconnected', () =>{
    console.log('MongoDB disconnected')
})

// Export the databse connection
module.exports = db    // here db is represented as db connection

// this we will import in index.js file 


// ....
// To sum it up , the db.js file acts as a central module that manages the connection to our MongoDb database using mongoose.
// It sets up the connection , handles connection events , and exports the connection object so that our express.js server can cause it to interact with the database
// It typically requires to establish the database connection before handling HTTP requests








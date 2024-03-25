const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef' , 'waiter' , 'manager'],   // it means work has limited choices is it don't matches with this 3 type then it will not save the data
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }

})

// mongoose will predetermined that  the given data matches with the schema or not , if it not matches then it will don't save the data

const Person = mongoose.model('Person',personSchema);
module.exports = Person;
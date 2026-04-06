const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mongodb-basic');

// Create a schema ==> Define the structure of the document ==>document  look and data Validation
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);
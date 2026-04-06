const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/user-card');

let userSchema = new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    Image: String,
},
    { timestamps: true }
);

module.exports = mongoose.model('usercard', userSchema);

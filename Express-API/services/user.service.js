const userModel = require("../models/user.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// when create a service -- when you want to change into database

// third validation --> check all field are not blank

module.exports.createUser = async ({ username, email, password, role }) => {
    if (!username || !email || !password) {
        throw new Error("All Field Are Required");
    }
    const user = await userModel.create({ username, email, password, role });

    return user;
}

// update data
module.exports.updateUser = async ({ userId, username, email }) => {
    const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { username, email },
        { new: true }
    )

    if (!updatedUser) {
        throw new Error("User Not Found");
    }

    return updatedUser;
};
// forget password
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

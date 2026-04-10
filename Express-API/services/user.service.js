const userModel = require("../models/user.model");


// thrid validation --> cheak all field are not blank

module.exports.createUser = async ({username, email, password}) => {
    if (!username || !email || !password){
        throw new Error ("All Filed Are Required");
    }
    const user = await userModel.create({username, email, password});

    return user;
};
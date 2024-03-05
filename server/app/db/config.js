const mongoose = require('mongoose');
const user = require('../models/Users');

const saveUser = async (newUser) => {
    return await newUser.save();
};

const findUser = async (object) => {
    return await user.find(object).exec();
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to the database');
    }
};



module.exports = {connectDB, saveUser, findUser};
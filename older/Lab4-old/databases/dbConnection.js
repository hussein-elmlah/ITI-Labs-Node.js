const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/todosDB', {});
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
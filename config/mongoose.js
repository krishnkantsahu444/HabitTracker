const mongoose = require('mongoose');

// storing the db on mongo atlas
const DB = "mongodb+srv://krishnkantsahu:kksahu123@cluster0.75ewcy4.mongodb.net/habittracker?retryWrites=true&w=majority";

// mongoose.connect('mongodb://127.0.0.1/habit_tracker');

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database :: MongoDB');
}).catch(err => {
    console.log('Error connecting to Database :: MongoDB', err);
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function() {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
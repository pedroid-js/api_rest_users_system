const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI 
            ? process.env.MONGODB_URI 
            : 'mongodb://localhost/databasetest';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongoose connected');
});


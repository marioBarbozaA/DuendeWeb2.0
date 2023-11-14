const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        console.log('dbConnect called');
        await mongoose.connect(process.env.MONGO_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error: ', err);
    }
};

const dbDisconnect = async () => {
    try {
        await mongoose.connection.close();
        console.log('Database disconnected successfully');
    } catch (err) {
        console.error('Database disconnection error: ', err);
    }
};

module.exports = {
    dbConnect,
    dbDisconnect
};

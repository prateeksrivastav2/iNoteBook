require('dotenv').config();
const mongoose = require('mongoose');
const connectToMongo = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/inoteBook');
    // console.log(process.env);

    const url=process.env.MONGODB_URI;
    // console.log(url);
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/inoteBook');
        // await mongoose.connect(url);
        console.log('Successfully started database');
    }
    // const db = mongoose.connection;
    catch (err) {
        // db.on('error', console.error.bind(console, 'Error starting database'));
        console.log(`Error connecting to MongoDB: ${err}`);
        // db.once('open',function(){
        //         console.log('Successfully started database');
        //     });
    }
}
//console.log('mongoose');
module.exports = connectToMongo;
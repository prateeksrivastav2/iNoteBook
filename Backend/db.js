const mongoose = require('mongoose');
const connectToMongo=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/inoteBook');
    const db = mongoose.connection;
    db.on('error',console.error.bind(console,'Error starting database'));
    db.once('open',function(){
            console.log('Successfully started database');
        });
    }
//console.log('mongoose');
module.exports = connectToMongo;
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONNECTION;

mongoose.connect(mongo_url).then(()=>{
    console.log('Database connected successfully');
}).catch((error) => {
    console.log('Database connection error ', error);
})
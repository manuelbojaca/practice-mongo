const mongoose = require('mongoose');


function connect () {
    mongoose.connect("mongodb://localhost:27017/practiceCRUD", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.once('open', ()=>{console.log('connection stablished')})
    mongoose.connection.on('error', () => {console.log('somethinfg went wrong', error)})

    return mongoose.connection
}
module.exports = {connect}
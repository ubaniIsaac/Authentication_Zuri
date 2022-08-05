const mongoose = require('mongoose')
require('dotenv').config()

const CONNECTION_URL = 'mongodb://localhost:27017/usersdb';


mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
    console.log('Mongo connection error', error)
    mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongo is disconnected')
})
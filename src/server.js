const express = require('express')
const cors = require('cors')
const auth = require("./middlewares/auth")
require("dotenv").config()


const app = express()


const PORT = process.env.PORT

require('./config/mongo')

app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'Todo List Application' })
});

require('./routes/users/user.router')(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
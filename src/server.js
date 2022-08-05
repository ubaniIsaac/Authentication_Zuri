const express = require('express')
const cors = require('cors')
const auth = require("./middlewares/auth")


const app = express()


app.use(cors({
    origin: 'http://localhost:3000',
}));


const PORT = process.env.PORT || 5000;

require('./config/mongo')

app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'Todo List Application' })
});

require('./routes/users/user.router')(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
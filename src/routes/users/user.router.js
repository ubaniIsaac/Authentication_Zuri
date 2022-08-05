const { check } = require('express-validator')
const userRouter = require('express').Router();

const userController = require("./user.controller")

module.exports = app => {

    userRouter.post('/signup', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists()
    ],
        userController.signup);

    userRouter.post('/login', userController.login);

    app.use('/', userRouter)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}

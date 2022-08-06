const { check } = require('express-validator')
const userRouter = require('express').Router();
const { authorization, checkisAdmin, checkisManager } = require('../../middlewares/auth')

const userController = require("./user.controller")

module.exports = app => {



    userRouter.post('/signup', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists()
    ],
        userController.signup);

    userRouter.post('/login', userController.login);

    userRouter.get('/users', authorization, checkisManager, userController.getUsers);

    userRouter.put('/users', authorization, checkisManager, userController.changeRole);

    userRouter.delete('/users', authorization, checkisManager, checkisAdmin, userController.deleteUser);

    app.use('/', userRouter)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}

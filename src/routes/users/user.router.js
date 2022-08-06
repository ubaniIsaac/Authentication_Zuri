const { check } = require('express-validator')
const userRouter = require('express').Router();
const { authorization, checkisAdmin, checkisManager, checkisStaff } = require('../../middlewares/auth')
const passwordReset = require("./passwordReset")

const userController = require("./user.controller")

module.exports = app => {



    userRouter.post('/signup', [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "A valid password is required").exists()
    ],
        userController.signup);

    userRouter.post('/login', userController.login);

    userRouter.get('/logout', authorization, (req, res) => {
        res.removeHeader('x-authorization')
        // if (err) return res.status(400).send(err);
        return res.redirect('/');
    });

    userRouter.get('/users', authorization, checkisManager, (req, res) => {
        res.json({ message: 'Manager Route ' })
    });

    userRouter.get('/admin', authorization, checkisAdmin, (req, res) => {
        res.json({ message: 'Admin Route ' })
    });

    userRouter.get('/staff', authorization, checkisStaff, (req, res) => {
        res.json({ message: 'Staff Route' })
    });

    userRouter.get('/users', authorization, (req, res) => {
        res.json({ message: 'User Route' })
    });

    userRouter.get('/users', authorization, checkisManager, userController.getUsers);

    userRouter.put('/users', authorization, checkisManager, userController.changeRole);

    userRouter.delete('/users', authorization, checkisAdmin, userController.deleteUser);

    app.use('/', userRouter)
    app.use('/password-reset', passwordReset)

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
        next();
    })
}

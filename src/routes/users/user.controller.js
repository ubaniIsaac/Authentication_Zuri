const usermodel = require('../../models/user.model')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { SECRET_KEY } = process.env




exports.signup = async (req, res) => {
    try {

        const { firstName, lastName, email, password, userRole } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ err: "Content cannot be empty" })
        }

        const existingUser = await usermodel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({
                error: "Email already in use"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await usermodel.signup(firstName, lastName, email, hashPassword, userRole);
        if (!user) {
            return res.status(500).json({
                error: "Some error occured"
            })
        }
        else {
            return res.json({ status: "success", data: user })
        }

    } catch (error) {
        throw error
    }

}

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send("All inputs required");
    }

    try {
        const user = await usermodel.login(email, password)
        if (!user || !(await bcrypt.compare(password, user.password))) {

            res.status(400).json({
                statusCode: 400,
                message: "Invalid Credentials"
            });

        } else {

            const payload = {
                user: {
                    id: user.id,
                    role: user.userRole
                }
            }
            jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
                if (err) throw err
                res.json({
                    statusCode: 200,
                    message: "Logged in Successfully",
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        userRole: user.userRole,
                        isAdmin: user.isAdmin,
                        isManager: user.isManager,
                        isStaff: user.isStaff
                    },
                    token
                })
            })
        }

    } catch (error) {
        throw error
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await usermodel.find().select("-password");

        res.json({
            statusCode: 200,
            message: "Users gotten successfully",
            users
        })
    } catch (error) {
        res.status(500).send("Server error")
    }
}

exports.changeRole = async (req, res) => {
    try {
        const { email, userRole, isAdmin, isStaff, isManager } = req.body

        const user = await usermodel.findOneAndUpdate({ email }, { userRole, isAdmin, isStaff, isManager })

        if (!user) {
            res.status(400).json({
                statusCode: 400,
                message: "Invalid Credentials"
            });

        }
        else {
            res.json({
                statusCode: 200,
                message: "user role changed successfully",
                user
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")

    }
}

exports.deleteUser = async (req, res) => {

    try {
        const user = usermodel.deleteOne({ _id: id })
        return user
    } catch (error) {
        res.status(500).send("Server error")

    }
}
const usermodel = require('../../models/user.model')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { SECRET_KEY } = process.env




exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, userRole } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await usermodel.signup(firstName, lastName, email, hashPassword, userRole);
        if (!user) {
            return res.status(500).json({
                error: "Some error occured"
            })
        }
        else {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "24h" })
            return res.json({ status: "success", data: user, token })
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
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = {
                user: {
                    id: user.id,
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
        } else {
            res.status(400).json({
                statusCode: 400,
                message: "Invalid Credentials"
            });
        }

    } catch (error) {
        throw error
    }
}


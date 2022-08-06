const jwt = require("jsonwebtoken")
require("dotenv").config()
const { SECRET_KEY } = process.env

exports.authorization = async (req, res, next) => {
    const token = await req.query.token || req.header("x-access-token") || req.header("x-authorization")

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "No token. Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded.user

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }

    return next()
}


exports.checkisManager = (req, res, next) => {
    if (req.user.role !== "manager") {
        return res.status(401).json({ message: "Restricted to Manager" })
    }
    return next()
}
exports.checkisAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({ message: "Restricted to admin" })
    }
    return next()
}
exports.checkisStaff = (req, res, next) => {
    if (req.user.role !== "staff") {
        return res.status(401).json({ message: "Restricted to Staff" })
    }
    return next()
}
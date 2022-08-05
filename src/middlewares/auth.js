const jwt = require("jsonwebtoken")
require("dotenv").config()
const { SECRET_KEY } = process.env

module.exports = async (req, res, next) => {
    const token = await req.query.token || req.headers("x-access-token");

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
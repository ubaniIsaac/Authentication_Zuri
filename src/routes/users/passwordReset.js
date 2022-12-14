const usermodel = require("../../models/user.model");
const Token = require("../../models/token");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require('bcrypt')
const express = require("express");
const router = express.Router();
require("dotenv").config()


router.post("/", async (req, res) => {
    try {
        const user = await usermodel.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");
        console.log(user._id)

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:userId/:token", async (req, res) => {
    try {
        const user = await usermodel.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashPassword;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;
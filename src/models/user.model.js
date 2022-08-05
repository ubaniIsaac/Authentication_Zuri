const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');


const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        UserRole: {
            type: String,
            enum: ["admin", "staff", "manager", "user"],
            default: "user"
        },
        isAdmin: {
            type: Boolean,
            default: 0
        },
        isManager: {
            type: Boolean,
            default: 0
        },
        isStaff: {
            type: Boolean,
            default: 0
        },
    },
    {
        collection: 'users'
    })

UserSchema.statics.signup = async function (
    email,
    password,
    type
) {
    try {
        const user = await this.create({ firstName, lastName, email, password, userRole })
        return user
    } catch (error) {
        throw error
    }
}

UserSchema.statics.login = async function (
    email,
    password,
) {
    try {
        const user = await this.findOne({
            email
        });
        if (!user) throw ({ error: 'Invalid credentials' })
        return user;
    } catch (error) {
        throw error;
    }
}

UserSchema.statics.getUserById = async function (id) {
    try {
        const user = await this.findOne({ _id: id });
        if (!user) throw ({ error: 'No user with this id found' })
        return user;
    } catch (error) {
        throw error;
    }
}

UserSchema.statics.getAllUsers = async function () {
    try {
        const users = await this.find()
        return users;
    } catch (error) {
        throw error;
    }
}

UserSchema.statics.deleteUserById = async function (id) {
    try {
        const result = await this.deleteOne({ _id: id });
        return result
    } catch (error) {
        throw error;
    }
}

module.exports = mongoose.model("User", UserSchema)

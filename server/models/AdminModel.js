import mongoose from "mongoose";
import { mongo, Schema } from "mongoose";
import bcrypt from "bcrypt"

const adminModel = new Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    district: {
        type: String
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
})


adminModel.pre('save', async function () {
    try {
        const userData = this;
        const saltRounds = 10;

        if (userData.isModified('password')) {
            userData.password =
                await bcrypt.hash(userData.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

adminModel.pre('findOneAndUpdate', async function () {
    try {
        const userData = this.getUpdate();
        const saltRounds = 10;

        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, saltRounds);
        }
    } catch (error) {
        throw error;
    }
});

export default mongoose.model("Admin", adminModel)
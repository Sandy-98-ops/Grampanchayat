import mongoose, { Schema, } from "mongoose";
import bcrypt from 'bcrypt'

const citizenSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    gender: {
        type: String,
    },
    mobile: {
        type: String
    },
    password: {
        type: String
    }

})

citizenSchema.pre('save', async function () {
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

citizenSchema.pre('findOneAndUpdate', async function () {
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

export default mongoose.model('citizen', citizenSchema)
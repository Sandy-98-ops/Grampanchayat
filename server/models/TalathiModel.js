import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const talathiModel = new Schema({

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
    village: {
        type: String
    },
    contact: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})


talathiModel.pre('save', async function () {
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

talathiModel.pre('findOneAndUpdate', async function () {
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

export default mongoose.model("Talathi", talathiModel)
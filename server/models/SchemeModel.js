import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const schemeModel = new Schema({

    schemeName: {
        type: String,
        required: true,
        trim: true,
        min: 3
    },
    benefits: {
        type: String,
    },
    department: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    eligibility: {
        type: String
    },
    requiredDocuments: {
        type: String,
    },
    applyLink: {
        type: String,
        required: true
    }
})

export default mongoose.model("Scheme", schemeModel)
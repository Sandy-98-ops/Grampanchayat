import mongoose, { Schema } from "mongoose";


const applicationSchema = new Schema({

    citizen: {
        type: Schema.Types.ObjectId, // Referencing another model
        ref: 'citizen', // Name of the model being referenced
        required: true
    },
    district: {
        type: String
    },
    taluka: {
        type: String
    },
    village: {
        type: String
    },
    applicantName: {
        type: String
    },
    fatherHusbandName: {
        type: String
    },
    motherName: {
        type: String
    },
    caste: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    pinCode: {
        type: String
    },
    mobile: {
        type: String
    },
    rationCard: {
        type: String
    },
    aadharCard: {
        type: String
    },
    panCard: {
        type: String
    },
    bankStatement: {
        type: String
    },
    addressProof: {
        type: String
    },
    approved: {
        type: Boolean
    },
    rejected: {
        type: Boolean
    },
    staffApprove: {
        type: Boolean
    },
    staffRjected: {
        type: Boolean
    },
    circleApprove: {
        type: Boolean
    },
    circleRejected: {
        type: Boolean
    },
    rejectRemarks: {
        type: String
    }

});

export default mongoose.model("Application", applicationSchema);
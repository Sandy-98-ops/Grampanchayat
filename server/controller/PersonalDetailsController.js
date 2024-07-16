
import CitizenPersonalDetails from "../models/CitizenPersonalDetails.js";

import { isValidObjectId } from 'mongoose';

export const create = async (req, res) => {
    try {
        const {
            citizen,
            district,
            taluka,
            village,
            applicantName,
            fatherHusbandName,
            motherName,
            caste,
            address,
            email,
            pinCode,
            mobile
        } = req.body;

        const files = req.files;

        // Extracting file paths and handling cases where files might not be uploaded
        const rationCard = files?.rationCard?.[0]?.path;
        const aadharCard = files?.aadharCard?.[0]?.path;
        const panCard = files?.panCard?.[0]?.path;
        const bankStatement = files?.bankStatement?.[0]?.path;
        const addressProof = files?.addressProof?.[0]?.path;

        console.log(rationCard, aadharCard, panCard, bankStatement, addressProof);

        // Validate citizen ID
        if (!isValidObjectId(citizen)) {
            return res.status(400).json({ message: "Invalid citizen ID format, try after relogin" });
        }

        // Find the most recent record for the citizen
        const latestDetails = await CitizenPersonalDetails.findOne({ citizen })
            .sort({ createdAt: -1 }); // Assuming `createdAt` is the timestamp field

        if (latestDetails) {
            if (latestDetails.rejected || latestDetails.staffRjected || latestDetails.circleRejected) {
                return res.status(400).json({ message: "User details already exist and were rejected by one of the authorities" });
            }
        }

        const newDetails = new CitizenPersonalDetails({
            citizen,
            district,
            taluka,
            village,
            applicantName,
            fatherHusbandName,
            motherName,
            caste,
            address,
            email,
            pinCode,
            mobile,
            rationCard,
            aadharCard,
            panCard,
            bankStatement,
            addressProof,
            approved: false,
            rejected: false,
            staffApprove: false,
            staffRjected: false,
            circleApprove: false,
            circleRejected: false,
            rejectRemarks: ''
        });

        await newDetails.save();

        return res.status(200).json({ message: "User details saved successfully" });
    } catch (error) {
        console.error("Error saving user details: ", error);
        return res.status(500).json({ message: `Server Error ${error.message}` });
    }
};


export const getAllApplications = async (req, res) => {

    try {
        return res.status(200)
            .json(await CitizenPersonalDetails.find());
    } catch (error) {
        console.error("Error saving user details: ", error);
        return res.status(500).json({ message: `Server Error ${error.message}` });
    }
}


export const getApplicationByCitizen = async (req, res) => {
    try {

        const { citizen } = req.params;

        return res.status(200)
            .json(await CitizenPersonalDetails.find({ citizen }));
    } catch (error) {
        console.error("Error saving user details: ", error);
        return res.status(500).json({ message: `Server Error ${error.message}` });
    }
}

export const staffApproval = async (req, res) => {

    const id = req.params.id;

    const application = await CitizenPersonalDetails.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.staffApprove = true;
    application.staffRjected = false;

    await CitizenPersonalDetails.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}


export const staffRejection = async (req, res) => {

    const id = req.params.id;


    const application = await CitizenPersonalDetails.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    const remarks = req.body.remarks;
    application.rejectRemarks = remarks;
    application.staffRjected = true;
    application.staffApprove = false;

    await CitizenPersonalDetails.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}

export const circleApproval = async (req, res) => {

    const id = req.params.id;

    const application = await CitizenPersonalDetails.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.circleApprove = true;
    application.circleRejected = false;

    await CitizenPersonalDetails.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}


export const circleRejection = async (req, res) => {

    const id = req.params.id;

    const application = await CitizenPersonalDetails.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    const remarks = req.body.remarks;
    application.rejectRemarks = remarks;
    application.circleRejected = true;
    application.circleApprove = false;

    await CitizenPersonalDetails.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}

export const approval = async (req, res) => {

    const id = req.params.id;

    const application = await CitizenPersonalDetails.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    application.approved = true;
    application.rejected = false;

    await CitizenPersonalDetails.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}


export const rejection = async (req, res) => {

    const id = req.params.id;

    const application = await CitizenPersonalDetails.findById(id);

    if (!application) {
        return res.status(404)
            .json({ message: "Application Not Found" });
    }

    const remarks = req.body.remarks;
    application.rejectRemarks = remarks;
    application.rejectRemarks = remarks;
    application.rejected = true;
    application.approved = false;

    await CitizenPersonalDetails.findByIdAndUpdate(id, application, { new: true });

    return res.status(200).
        json({ message: "Status updated successfully" });

}


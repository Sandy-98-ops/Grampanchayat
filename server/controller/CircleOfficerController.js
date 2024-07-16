
import bcrypt from 'bcrypt'
import { generateRandomText } from '../utils/GenerateRandomText.js';
import CircleOfficerModel from '../models/CircleOfficerModel.js';
import { sendCircleOfficerCreationMail } from '../utils/EmailService.js';

export const create = async (req, res) => {
    try {
        console.log(req.body)
        const admin = new CircleOfficerModel(req.body)

        const { password } = req.body;

        const email = admin.email;

        const existingUser = await CircleOfficerModel.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json({ message: "User already Exists" });
        }

        await admin.save();

        sendCircleOfficerCreationMail(admin.email, admin.firstName, password);

        return res.status(200)
            .json({ message: "User Data saved successfully" })
    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const admin = await CircleOfficerModel.findOne({ email });
        console.log(admin)
        if (!admin) {
            return res.status(404)
                .json({ message: "admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json({ admin })

    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const getAllCircleOfficer = async (req, res) => {

    try {
        return res.status(200).json(await CircleOfficerModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getCircleOfficerById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await CircleOfficerModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "CircleOfficerModel not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateCircleOfficerById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await CircleOfficerModel.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteCircleOfficerById = async (req, res) => {
    try {

        const id = req.params.id;

        await CircleOfficerModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const changeCircleOfficerPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const student = await CircleOfficerModel.findById(id)

        if (!student) {
            return res.status(404)
                .json({ message: "User not found" });
        }

        const isMatch = await
            bcrypt.compare(oldPassword, student.password);

        if (!isMatch) {
            return res.status(401)
                .json({ message: "Entered password is wrong" });
        }

        student.password = newPassword;

        await student.save();

        return res.status(200)
            .json({
                message: "Password Changed Successfully :"
            });

    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }

}

export const forgotCircleOfficerPassword = async (req, res) => {
    const { email } = req.params;
    try {

        console.log(email)
        let student = await CircleOfficerModel.findOne({ email });

        if (!student) {
            return res.status(404)
                .json({ message: "CircleOfficerModel Not Found" });
        }

        const randomText = generateRandomText(8); // Generate an 8-character random string

        student.password = randomText;

        student = await CircleOfficerModel.findByIdAndUpdate(student._id, student, { new: true });

        console.log("Updated Password: ", randomText);
        sendForgotPasswordEmail(student.email, student.firstName, randomText);
        return res.status(200)
            .json({ message: "Success" });
    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }
}
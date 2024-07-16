
import bcrypt from 'bcrypt'
import TalathiModel from '../models/TalathiModel.js';
import { generateRandomText } from '../utils/GenerateRandomText.js';

export const create = async (req, res) => {
    try {
        console.log(req.body)
        const staff = new TalathiModel(req.body)

        const email = staff.email;

        const existingUser = await TalathiModel.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json({ message: "User already Exists" });
        }

        await staff.save();

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
        const staff = await TalathiModel.findOne({ email });
        console.log(staff)
        if (!staff) {
            return res.status(404)
                .json({ message: "staff not found" });
        }

        const isMatch = await bcrypt.compare(password, staff.password);

        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json({ staff })

    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const getAllTalathi = async (req, res) => {

    try {
        return res.status(200).json(await TalathiModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getTalathiById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await TalathiModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "Talathi not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateTalathiById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await TalathiModel.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteTalathiById = async (req, res) => {
    try {

        const id = req.params.id;

        await TalathiModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const changeTalathiPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const student = await TalathiModel.findById(id)

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

export const forgotTalathiPassword = async (req, res) => {
    const { email } = req.params;
    try {

        console.log(email)
        let student = await TalathiModel.findOne({ email });

        if (!student) {
            return res.status(404)
                .json({ message: "TalathiModel Not Found" });
        }

        const randomText = generateRandomText(8); // Generate an 8-character random string

        student.password = randomText;

        student = await TalathiModel.findByIdAndUpdate(student._id, student, { new: true });

        console.log("Updated Password: ", randomText);
        sendForgotPasswordEmail(student.email, student.firstName, randomText);
        return res.status(200)
            .json({ message: "Success" });
    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }
}
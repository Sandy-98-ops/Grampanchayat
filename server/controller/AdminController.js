
import bcrypt from 'bcrypt'
import AdminModel from '../models/AdminModel.js';
import { generateRandomText } from '../utils/GenerateRandomText.js';

export const create = async (req, res) => {
    try {
        console.log(req.body)
        const admin = new AdminModel(req.body)

        const email = admin.email;

        const existingUser = await AdminModel.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json({ message: "User already Exists" });
        }

        await admin.save();

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
        const admin = await AdminModel.findOne({ email });
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

export const getAllAdmin = async (req, res) => {

    try {
        return res.status(200).json(await AdminModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getAdminById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await AdminModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "AdminModel not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateAdminById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await AdminModel.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteAdminById = async (req, res) => {
    try {

        const id = req.params.id;

        await AdminModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const changeAdminPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const student = await AdminModel.findById(id)

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

export const forgotAdminPassword = async (req, res) => {
    const { email } = req.params;
    try {

        console.log(email)
        let student = await AdminModel.findOne({ email });

        if (!student) {
            return res.status(404)
                .json({ message: "AdminModel Not Found" });
        }

        const randomText = generateRandomText(8); // Generate an 8-character random string

        student.password = randomText;

        student = await AdminModel.findByIdAndUpdate(student._id, student, { new: true });

        console.log("Updated Password: ", randomText);
        sendForgotPasswordEmail(student.email, student.firstName, randomText);
        return res.status(200)
            .json({ message: "Success" });
    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }
}
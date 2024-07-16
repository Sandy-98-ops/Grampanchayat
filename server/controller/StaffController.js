
import bcrypt from 'bcrypt'
import StaffModel from '../models/StaffModel.js';
import { generateRandomText } from '../utils/GenerateRandomText.js';
import { sendUserCreationMail } from '../utils/EmailService.js';


export const create = async (req, res) => {
    try {
        console.log(req.body)
        const staff = new StaffModel(req.body)

        const { password } = req.body;
        const email = staff.email;

        const existingUser = await StaffModel.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json({ message: "User already Exists" });
        }

        await staff.save();

        sendUserCreationMail(staff.email, staff.firstName, password);


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
        const staff = await StaffModel.findOne({ email });
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


export const getAllStaff = async (req, res) => {

    try {
        return res.status(200).json(await StaffModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getStaffById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await StaffModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "Staff not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateStaffById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await StaffModel.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteStaffById = async (req, res) => {
    try {

        const id = req.params.id;

        await StaffModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const changeStaffPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const student = await StaffModel.findById(id)

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

export const forgotStaffPassword = async (req, res) => {
    const { email } = req.params;
    try {

        console.log(email)
        let student = await StaffModel.findOne({ email });

        if (!student) {
            return res.status(404)
                .json({ message: "StaffModel Not Found" });
        }

        const randomText = generateRandomText(8); // Generate an 8-character random string

        student.password = randomText;

        student = await StaffModel.findByIdAndUpdate(student._id, student, { new: true });

        console.log("Updated Password: ", randomText);
        sendForgotPasswordEmail(student.email, student.firstName, randomText);
        return res.status(200)
            .json({ message: "Success" });
    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }
}
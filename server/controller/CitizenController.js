import CitizenModel from "../models/CitizenModel.js"
import bcrypt from 'bcrypt'
import { generateRandomText } from "../utils/GenerateRandomText.js"

export const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const citizen = new CitizenModel(req.body)

        const email = citizen.email;

        const existingUser = await CitizenModel.findOne({ email })

        if (existingUser) {
            return res.status(400)
                .json({ message: "User already Exists" });
        }

        await citizen.save();

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
        const citizen = await CitizenModel.findOne({ email });
        console.log(citizen)
        if (!citizen) {
            return res.status(404)
                .json({ message: "citizen not found" });
        }

        const isMatch = await bcrypt.compare(password, citizen.password);

        if (!isMatch) {
            return res.status(401).
                json({ message: "Invalid Credentials", status: 0 })
        }

        return res.status(200).
            json({ citizen })

    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const getAllCitizen = async (req, res) => {

    try {
        return res.status(200).json(await CitizenModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getCitizenById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await CitizenModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "CitizenModel not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateCitizenById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await CitizenModel.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteCitizenById = async (req, res) => {
    try {

        const id = req.params.id;

        await CitizenModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const changeCitizenPassword = async (req, res) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.params;

    try {
        const student = await CitizenModel.findById(id)

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

export const forgotCitizenPassword = async (req, res) => {
    const { email } = req.params;
    try {

        console.log(email)
        let student = await CitizenModel.findOne({ email });

        if (!student) {
            return res.status(404)
                .json({ message: "CitizenModel Not Found" });
        }

        const randomText = generateRandomText(8); // Generate an 8-character random string

        student.password = randomText;

        student = await CitizenModel.findByIdAndUpdate(student._id, student, { new: true });

        console.log("Updated Password: ", randomText);
        sendForgotPasswordEmail(student.email, student.firstName, randomText);
        return res.status(200)
            .json({ message: "Success" });
    } catch (error) {
        return res.status(500)
            .json({ message: `Server error: ${error}` })
    }
}
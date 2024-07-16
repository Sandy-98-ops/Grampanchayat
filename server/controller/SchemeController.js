import SchemeModel from "../models/SchemeModel.js";


export const create = async (req, res) => {
    try {
        console.log(req.body)
        const admin = new SchemeModel(req.body)

        const { password } = req.body;

        const schemeName = admin.schemeName;

        const existingUser = await SchemeModel.findOne({ schemeName })

        if (existingUser) {
            return res.status(400)
                .json({ message: "User already Exists" });
        }

        await admin.save();

        return res.status(200)
            .json({ message: "Data saved successfully" })
    } catch (error) {
        return res.status(500)
            .json({ message: `Server Error ${error}` })
    }
}

export const getAllScheme = async (req, res) => {

    try {
        return res.status(200).json(await SchemeModel.find());

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const getSchemeById = async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const student = await SchemeModel.findById(id);
            if (!student) {
                return res.status(400)
                    .json({ message: "Scheme not Found" });
            }
            return res.status(200)
                .json(student);
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const updateSchemeById = async (req, res) => {
    try {

        const id = req.params.id;

        const student = req.body;

        if (student) {
            await SchemeModel.findByIdAndUpdate(id, student, { new: true });
            return res.status(200)
                .json({ message: "Data Updated Successfully" });
        }

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}

export const deleteSchemeById = async (req, res) => {
    try {

        const { id } = req.params;


        await SchemeModel.findByIdAndDelete(id);

        return res.status(200)
            .json({ message: "Record deleted successfully" })

    } catch (error) {
        return res.status(500)
            .json({ message: `Internal Server Error: ${error}` });
    }
}
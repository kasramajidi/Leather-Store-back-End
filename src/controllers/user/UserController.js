const UserModel = require("./../../models/User")
const mongoose = require("mongoose")

exports.getAllUser = async (req, res) => {
    try {
        const user = await UserModel.find().lean()
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getByID = async (req, res) => {
    try {
        const id = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "ID is not vaild"
            })
        }

        const user = await UserModel.find({ _id: id }).lean()

        res.status(200).json(user)

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
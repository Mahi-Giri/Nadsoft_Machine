import { Schema, model } from "mongoose";

const studSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        subject: {
            type: String,
            required: true,
        },

        mark: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Stud = model("Stud", studSchema);

export default Stud;

import { Schema, model } from "mongoose";

const studentSchema = new Schema(
    {
        id:{
            type: Number,
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        age: {
            type: Number,
            required: true,
        },
        
        marks: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Student = model("Student", studentSchema);

export default Student;

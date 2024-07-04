import Stud from "../models/stud.model.js";
import { errorHandler } from "../utils/error.js";

export const createStudent = async (req, res, next) => {
    try {
        const { name, subject, mark } = req.body;

        if (!name || !subject || !mark ) return next(errorHandler(400, "All fields are required"));

        // const existingStudent = await Student.findOne({ email });
        // console.log(existingStudent);

        // if (existingStudent) return next(errorHandler(400, "Student with this email already exists"));

        const newStudent = new Stud({
            name,
            subject,
            mark,
        });

        const savedStudent = await newStudent.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getStudents = async (req, res, next) => {
    try {
        const students = await Stud.find();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

export const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updateData = req.body;

        const updatedStudent = await Stud.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedStudent) return next(errorHandler(404, "Student not found"));

        res.status(200).json(updatedStudent);
    } catch (error) {
        next(error);
    }
};

export const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Stud.findByIdAndDelete(id);

        if (!deletedStudent) return next(errorHandler(404, "Student not found"));

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        next(error);
    }
};

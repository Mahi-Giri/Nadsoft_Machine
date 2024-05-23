import Student from "../models/student.model.js";
import { errorHandler } from "../utils/error.js";

export const createStudent = async (req, res, next) => {
    try {
        const { name, email, age, marks } = req.body;

        if (!name || !email || !age || !marks) return next(errorHandler(400, "All fields are required"));

        const existingStudent = await Student.findOne({ email });

        if (existingStudent) return next(errorHandler(400, "Student with this email already exists"));

        const newStudent = new Student({
            name,
            email,
            age,
            marks,
        });

        const savedStudent = await newStudent.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        next(error);
    }
};

export const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

export const getStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) return next(errorHandler(404, "Student not found"));

        res.status(200).json(student);
    } catch (error) {
        next(error);
    }
};

export const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updateData = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedStudent) return next(errorHandler(404, "Student not found"));

        res.status(200).json(updatedStudent);
    } catch (error) {
        next(error);
    }
};

export const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) return next(errorHandler(404, "Student not found"));

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        next(error);
    }
};

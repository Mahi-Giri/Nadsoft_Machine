import express from "express";
import {
    createStudent,
    deleteStudent,
    getStudent,
    getStudents,
    updateStudent,
} from "../controller/student.controller.js";

const router = express.Router();

router.post("/create", createStudent);
router.get("/getStudents", getStudents);
router.get("/getStudent/:id", getStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;

import express from "express";
import {
    createStudent,
    deleteStudent,
    getStudents,
    updateStudent,
} from "../controller/stud.controller.js";

const router = express.Router();

router.post("/create", createStudent);
router.get("/getStudents", getStudents);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;

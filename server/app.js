import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

app.use(cookieParser());

// Router
import studentRoute from "./router/stud.router.js";
import userRoute from "./router/user.router.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/student", studentRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

export { app };

import "dotenv/config";
import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import session from "express-session";
const app = express();

app.use(
    cors({
        credentials: true,
        origin: "https://a5--kambaz-react-web-app-yw.netlify.app",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204
    })
);
 // make sure cors is used right after creating the app
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        sameSite: "none",
        secure: true
    }
};
app.use(session(sessionOptions));
app.use(express.json());

// Add root route handler
app.get("/", (req, res) => {
    res.send("Welcome to the Kambaz API Server");
});

UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);


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

// Configure CORS before other middleware
app.use(
    cors({
        credentials: true,
        origin: function(origin, callback) {
            const allowedOrigins = [
                'https://a5--kambaz-react-web-app-yw.netlify.app',
                'https://kambaz-react-web-app-yw.netlify.app',
                'http://localhost:5173'
            ];
            // Check if origin is allowed or if it's undefined (for same-origin requests)
            if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
                callback(null, origin);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        exposedHeaders: ['Access-Control-Allow-Origin'],
        optionsSuccessStatus: 204,
        preflightContinue: false
    })
);

// Add security headers middleware
app.use((req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
});

// Configure session after CORS
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
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


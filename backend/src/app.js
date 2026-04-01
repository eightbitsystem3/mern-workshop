import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { dbconnect } from "./utils/db-con.js";
import { isLoggedInCheck } from "./middlewares/auth.js";

// Routers
import userRouter from "./routes/user.js";
import itemRouter from "./routes/item.js";

// Load env variables (FIXED)
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGO_URI;

// Database Connection
dbconnect(MONGODB_URI);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(isLoggedInCheck);

// Routes
app.get("/api", (req, res) => {
    return res.json({ user: req.user || null });
});

app.get("/api/health", (req, res) => {
    return res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});

app.use("/api/user", userRouter);
app.use("/api/items", itemRouter);


// error middleware
app.use((err, req, res, next) => {
    console.log(err);
    const { status = 500, message } = err;
    res.status(status).send({ error: message, status: status });
});


// Start Server
app.listen(port, () => {
    console.log(`Interns app listening on port ${port}`);
});
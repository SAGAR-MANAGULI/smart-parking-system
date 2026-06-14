const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const connectDB = require("./config/db");

const vehicleRoutes = require("./routes/vehicleRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const slotRoutes = require("./routes/slotRoutes");
const reportRoutes = require("./routes/reportRoutes");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const settingRoutes = require("./routes/settingRoutes");

app.set("io", io);


// Connect Database
connectDB();

// Security Middleware
app.use(express.json());

app.use(cors());

app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too Many Requests, Please Try Again Later",
});

app.use(limiter);

// Routes
app.use("/api/vehicles", vehicleRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/slots", slotRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/settings", settingRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Smart Parking Backend Running");
});

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found",
    });
});

// Global Error Middleware
app.use(errorHandler);

let onlineUsers = 0;

io.on("connection", (socket) => {
    console.log("new client connected");

    console.log(
        `Socket Connected: ${socket.id}`
    );
    socket.on("error", (error) => {

        console.log(
            `Socket Error: ${error.message}`
        );
    });

    socket.on("joinAdminRoom", (role) => {

        if (role === "admin") {

            socket.join("adminRoom");

            console.log("Admin Joined Room");
        }
    });

    onlineUsers++;

    io.emit("onlineUsers", onlineUsers);

    socket.on("disconnect", (reason) => {
        onlineUsers--;

        io.emit("onlineUsers", onlineUsers);
        console.log(
            `Client Disconnected: ${socket.id}`
        );

        console.log(`Reason: ${reason}`);
    });
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
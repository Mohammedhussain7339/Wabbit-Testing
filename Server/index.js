import express from "express";
import authRouter from "./Routes/auth.js";
import profileRouter from "./Routes/profile.js";
import portfolioRouter from "./Routes/portfolio.js";
import normaluserRouter from "./Routes/normaluser.js";
import googleuserRouter from "./Routes/googleuser.js";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./db/Db.js";

dotenv.config();

const port = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

// ✅ Initialize express app
const app = express();

// ✅ Define proper CORS options
const corsOptions = {
  origin: [BASE_URL, "http://localhost:5173", "https://wabbit-frontend.onrender.com"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// ✅ Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Wrap startup logic in async function
const startServer = async () => {
  try {
    await connectToDb();

    app.use("/auth", authRouter);
    app.use("/api", profileRouter);
    app.use("/api", portfolioRouter);
    app.use("/api", normaluserRouter);
    app.use("/api", googleuserRouter);

    app.get("/", (req, res) => {
      res.send("healthy");
    });

    app.listen(port, () => console.log(`Server started on port 🥸 ${port}`));
  } catch (error) {
    console.log("⚠️ Error starting server:", error.message);
  }
};

startServer();

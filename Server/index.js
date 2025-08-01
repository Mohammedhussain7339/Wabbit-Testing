import express from "express";
import authRouter from "./Routes/auth.js"
import profileRouter from "./Routes/profile.js"
import portfolioRouter from "./Routes/portfolio.js"
import normaluserRouter from "./Routes/normaluser.js"
import googleuserRouter from "./Routes/googleuser.js";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./db/Db.js";

dotenv.config();
const port = process.env.PORT || 3000; // Default to 3000 if PORT is undefined

try {
  const app = express();

  app.use(express.json());
  // If you are setting this in your Express app:
app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy"); // or avoid setting it
  next();
});

  app.use(cors({ origin: "https://wabbit.onrender.com/" })); // Replace with your frontend's URL
  await connectToDb();

  app.use("/auth" , authRouter);
  app.use("/api", profileRouter)
  app.use("/api", portfolioRouter)
  app.use("/api", normaluserRouter)
  app.use("/api",googleuserRouter)
  

  app.get("/", (req, res) => {
    res.send("healthy");
  });

  app.listen(port, () => console.log(`Server started on port 🥸  ${port}`));
} catch (error) {
  console.log("⚠️ Error starting server: ", error.message);
}

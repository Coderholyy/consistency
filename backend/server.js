import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import goalsRoutes from "./routes/goals.js";
import trackingsRoutes from "./routes/trackingRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import updateTodoList from "./cronJobs/updateTodoList.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/goals", goalsRoutes);
app.use("/trackings", trackingsRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/todos", todoRoutes);

// Start Cron Job for updating To-Do List
updateTodoList();
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT} or on cloud at PORT ${PORT}`
  );
});

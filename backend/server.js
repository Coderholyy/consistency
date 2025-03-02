import express, { response } from "express";
import userRoutes from "./routes/user.js";
import goalsRoutes from "./routes/goals.js";
import trackingsRoutes from "./routes/trackingRoutes.js";

const app = express();

app.use(express.json());

app.use("/user", userRoutes);

app.use("/goals", goalsRoutes);

app.use("/trackings", trackingsRoutes);

app.listen(5001, () => {
  console.log("app listening at http://localhost:5001");
});

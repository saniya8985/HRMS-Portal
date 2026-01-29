import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import adminRouter from "./Routes/AdminRoute.js";
import employeeRouter from "./Routes/EmployeeRoute.js";
import salaryRoutes from "./Routes/SalaryRoute.js";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/hrms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.use("/api/admin", adminRouter);

app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRoutes);


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

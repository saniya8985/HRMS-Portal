import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const EmployeeModel = mongoose.model("Employee", employeeSchema);

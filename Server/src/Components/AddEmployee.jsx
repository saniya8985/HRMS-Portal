import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import "bootstrap/dist/css/bootstrap.min.css";

const AddEmployee = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/employee/add", values);
      setMessage(res.data.message || "✅ Employee added successfully!");

      // ✅ Wait 1 second then redirect to All Employees page
      setTimeout(() => {
        navigate("/dashboard/all-employees");
      }, 1000);
    } catch (err) {
      console.error("Error adding employee:", err);
      if (err.response) setMessage(`❌ ${err.response.data.message}`);
      else setMessage("⚠️ Server not responding. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #007bff, #00b4d8)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "100%", maxWidth: "550px", backgroundColor: "#fff" }}
      >
        {/* Header */}
        <div
          className="text-center text-white py-3 rounded-3 mb-4"
          style={{
            background: "linear-gradient(135deg, #007bff, #00b4d8)",
            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h4 className="fw-bold mb-0">👤 Add New Employee</h4>
          <small className="text-light">Enter employee details below</small>
        </div>

        {/* Alert Message */}
        {message && (
          <div
            className={`alert ${
              message.includes("✅")
                ? "alert-success"
                : message.includes("⚠️")
                ? "alert-warning"
                : "alert-danger"
            } text-center shadow-sm py-2`}
          >
            {message}
          </div>
        )}

        {/* Employee Form */}
        <form onSubmit={handleSubmit} className="px-1">
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">
              Full Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3 shadow-sm"
              placeholder="Enter full name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-sm rounded-3 shadow-sm"
              placeholder="Enter email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">
              Position / Role
            </label>
            <input
              type="text"
              className="form-control form-control-sm rounded-3 shadow-sm"
              placeholder="e.g. Software Engineer"
              value={values.position}
              onChange={(e) => setValues({ ...values, position: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">
              Monthly Salary (₹)
            </label>
            <input
              type="number"
              className="form-control form-control-sm rounded-3 shadow-sm"
              placeholder="Enter salary amount"
              value={values.salary}
              onChange={(e) => setValues({ ...values, salary: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold shadow-sm rounded-3 py-2"
            style={{
              background: "linear-gradient(135deg, #007bff, #00b4d8)",
              border: "none",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #00b4d8, #007bff)")
            }
            onMouseOut={(e) =>
              (e.target.style.background =
                "linear-gradient(135deg, #007bff, #00b4d8)")
            }
          >
            ➕ Add Employee
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 small text-muted">
          © 2025 HRMS Solutions Pvt. Ltd.
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;

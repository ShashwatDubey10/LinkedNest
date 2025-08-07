import React, { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        required
        className="input input-bordered w-full"
        value={form.firstName}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name (optional)"
        className="input input-bordered w-full"
        value={form.lastName}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="input input-bordered w-full"
        value={form.email}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        type="password"
        name="password"
        placeholder="Password (min 6 chars)"
        required
        className="input input-bordered w-full"
        value={form.password}
        onChange={handleChange}
        disabled={loading}
      />
      <button
        type="submit"
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;

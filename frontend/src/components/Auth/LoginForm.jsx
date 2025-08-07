import React, { useState } from "react";
import { login, checkAuth } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../App"; 

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form);

      const userData = await checkAuth();
      setUser(userData);

      toast.success("Login successful!");
      navigate("/"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="Password"
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
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;

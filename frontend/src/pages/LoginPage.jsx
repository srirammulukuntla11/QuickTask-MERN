import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { token, setToken, setUser } = useContext(AuthContext);

  // If already logged in, don't show login page
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosClient.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      setToken(response.data.token);

      setUser(response.data.user);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <Card className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your QuickTask account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </div>

      </Card>

    </div>
  );
}

export default LoginPage;
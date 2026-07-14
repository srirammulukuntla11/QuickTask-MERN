import { useContext, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const { token, setToken, setUser } =
    useContext(AuthContext);

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
    <Card>

      <div className="text-center mb-8">

        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">

          <span className="text-3xl text-white">
            ✓
          </span>

        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          Welcome Back
        </h1>

        <p className="text-gray-500 mt-3">
          Sign in to continue managing your tasks
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>

        </div>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </Button>

      </form>

      <div className="mt-8 border-t pt-6 text-center">

        <p className="text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create Account
          </Link>

        </p>

      </div>

    </Card>
  );
}

export default LoginPage;
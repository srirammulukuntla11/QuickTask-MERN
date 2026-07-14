import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import axiosClient from "../api/axiosClient";

function RegisterPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        "/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>

      <div className="text-center mb-8">

        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-xl">

          <span className="text-3xl text-white">
            👤
          </span>

        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          Create Account
        </h1>

        <p className="text-gray-500 mt-3">
          Join QuickTask and organize your work efficiently.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <Input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

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
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </Button>

      </form>

      <div className="mt-8 border-t pt-6 text-center">

        <p className="text-gray-600">

          Already have an account?{" "}

          <Link
            to="/"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign In
          </Link>

        </p>

      </div>

    </Card>
  );
}

export default RegisterPage;
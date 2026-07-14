import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import axiosClient from "../api/axiosClient";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await axiosClient.patch(
        "/auth/forgot-password",
        formData
      );

      alert(response.data.message);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to update password"
      );

    }
  };

  return (
    <Card>

      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>

        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <Input
          type="password"
          name="password"
          placeholder="Enter New Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <Button type="submit">
          Update Password
        </Button>

      </form>

    </Card>
  );
}

export default ForgotPasswordPage;
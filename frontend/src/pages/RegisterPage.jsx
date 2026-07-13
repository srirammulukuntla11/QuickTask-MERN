import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import axiosClient from "../api/axiosClient";

function RegisterPage() {
  const navigate = useNavigate();

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
      const response = await axiosClient.post(
        "/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Card>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <Button type="submit">
          Register
        </Button>
      </form>
    </Card>
  );
}

export default RegisterPage;
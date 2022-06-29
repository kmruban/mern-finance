import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import 'antd/dist/antd.css';
import { Form, message, Input } from "antd";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", values);
      localStorage.setItem(
        "finance-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      message.success("Login Successful");
      console.log("Login Successful");
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("finance-user")) {
      navigate("/");
      console.log("user");
    }
  }, []);

  return (
    <div className="main">
      <div className="content">
        <Form layout="vertical" onFinish={handleSubmit}>
          <h1>LOGIN</h1>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Email is required!',
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Password is required!',
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/login">Not Registered yet? Click Here To Register!  </Link>
            <button className="secondary" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;

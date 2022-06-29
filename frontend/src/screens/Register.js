import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import 'antd/dist/antd.css';
import { Form, message, Input } from "antd";

import './css/logreg.css';

function Register() {
  //cd fconst navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:5000/api/users/register", values);
      message.success("Registration Successful");
      console.log("Registration Successful");
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="main">
        <div className="content">
          <Form layout="vertical" onFinish={handleSubmit}>
            <h1>REGISTER</h1>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true ,
                  min: 4,
                  message: 'Enter at least 4 characters for your Name!',
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: 'Enter a valid Email Address!',
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
                  message: 'Enter at least 8 characters for your Password!',
                },
              ]}
            >
              <Input.Password type="password" placeholder="Create a password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered? Click Here To Login!  </Link>
              <button className="secondary" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      
    </div>
  )
}

export default Register;

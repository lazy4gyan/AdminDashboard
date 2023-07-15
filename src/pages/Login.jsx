import { Form, Button, Input } from "antd";
import { Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../utils/auth";
import { passwordRegex } from "../constants/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const { Title } = Typography;
  const { handleLogin } = useContext(AuthContext);

  return (
    <main className="center-box ">
      <section className="section-style">
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={(values) => handleLogin(values)}
          onFinishFailed={() => {
            toast.error("Username and Password required.");
          }}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            User Login
          </Title>
          <Form.Item
            name="userName"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
              { whitespace: true },
              { min: 3 },
              { max: 25 },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
              {
                max: 16,
                message: "Password cannot exceed 16 characters",
              },
              {
                pattern: passwordRegex,
                message:
                  "Password must include at least one lowercase letter, one uppercase letter, one special character, and one number",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Link to="/register">
              <Button block type="secondary">
                Register
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </section>
    </main>
  );
};

export default Login;

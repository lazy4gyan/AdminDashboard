import { Form, Button, Checkbox, DatePicker, Input, Select } from "antd";
import { Typography } from "antd";
import { useContext } from "react";
import { GlobalContext } from "../store/globalStore";
import { handleDateValidator } from "../utils/validator";
import { toast } from "react-toastify";
import { emailRegex, passwordRegex } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // using the global context for username validation and registration
  const { users, handleRegisterUser } = useContext(GlobalContext);
  const { Title } = Typography;
  const navigate = useNavigate();

  function clickToNavigate() {
    navigate("/login");
  }

  return (
    <main className="center-box ">
      <section className="section-style">
        {/* Wrapping all the field with validation under the form component */}
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={(values) => handleRegisterUser(values)}
          onFinishFailed={() => {
            toast.error("Please fill all required fields.");
          }}
        >
          <Title level={2} style={{ textAlign: "center" }}>
            User Registeration
          </Title>

          <Form.Item
            name="id"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
              { whitespace: true },
              { min: 3 },
              { max: 10 },
              {
                validator: (_, value) => {
                  const existingUser =
                    users && users.find((user) => user.id === value);
                  if (!existingUser) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Username already exists");
                },
              },
            ]}
            hasFeedback
          >
            <Input placeholder="e.g., johnd23" />
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

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Confirm password is required.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered does not match."
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter your fullname",
              },
              { whitespace: true },
              { min: 3 },
              { max: 25 },
            ]}
            hasFeedback
          >
            <Input placeholder="e.g., John Doe" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
              {
                pattern: emailRegex,
                message:
                  "Please enter a valid email from Gmail, Outlook, Hotmail, or Yahoo",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="e.g., john@gmail.com" />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Select placeholder="Select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              {
                required: true,
                message: "Please provide your date of birth",
              },
              {
                validator: handleDateValidator,
              },
            ]}
            hasFeedback
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="e.g., 2000-01-01"
            />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <Input.TextArea placeholder="Enter your address" rows={4} />
          </Form.Item>

          <Form.Item
            name="agreement"
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        "To proceed, you need to agree with our terms and conditions"
                      ),
              },
            ]}
          >
            <Checkbox>
              Agree to our <a href="#">Terms and Conditions</a>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            Already, having an account.Please{" "}
            <a onClick={clickToNavigate}>Log in</a> to continue.
          </Form.Item>
        </Form>
      </section>
    </main>
  );
};

export default Register;

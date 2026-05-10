import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

type SignUpFieldType = {
  fullName?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const onFinish: FormProps<SignUpFieldType>["onFinish"] = (values) => {
  console.log("Sign up success:", values);
};

const onFinishFailed: FormProps<SignUpFieldType>["onFinishFailed"] = (
  errorInfo,
) => {
  console.log("Sign up failed:", errorInfo);
};

const SignUpComponent: React.FC = () => {
  return (
    <Form
      name="signup"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <Form.Item<SignUpFieldType>
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Choose a username" />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        hasFeedback
      >
        <Input.Password placeholder="Create a password" />
      </Form.Item>

      <Form.Item<SignUpFieldType>
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Re-enter your password" />
      </Form.Item>

      <Form.Item className="auth-form-action">
        <Button block type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpComponent;

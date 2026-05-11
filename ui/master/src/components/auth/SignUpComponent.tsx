import { Button, Form, Input } from "antd";

import type { SignUpFormValues } from "../../types/user";

type SignUpComponentProps = {
  loading?: boolean;
  onSubmit: (values: SignUpFormValues) => Promise<void> | void;
};

function SignUpComponent({
  loading = false,
  onSubmit,
}: SignUpComponentProps) {
  return (
    <Form
      name="signup"
      layout="vertical"
      onFinish={onSubmit}
      autoComplete="off"
      size="large"
    >
      <Form.Item<SignUpFormValues>
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      <Form.Item<SignUpFormValues>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item<SignUpFormValues>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Choose a username" />
      </Form.Item>

      <Form.Item<SignUpFormValues>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        hasFeedback
      >
        <Input.Password placeholder="Create a password" />
      </Form.Item>

      <Form.Item<SignUpFormValues>
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
        <Button block type="primary" htmlType="submit" loading={loading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpComponent;

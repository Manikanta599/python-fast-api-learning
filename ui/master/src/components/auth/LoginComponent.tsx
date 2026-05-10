import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

type LoginFieldType = {
  username?: string;
  password?: string;
};

const onFinish: FormProps<LoginFieldType>["onFinish"] = (values) => {
  console.log("Login success:", values);
};

const onFinishFailed: FormProps<LoginFieldType>["onFinishFailed"] = (
  errorInfo,
) => {
  console.log("Login failed:", errorInfo);
};

const LoginComponent: React.FC = () => {
  return (
    <Form
      name="login"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <Form.Item<LoginFieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Enter your username" />
      </Form.Item>

      <Form.Item<LoginFieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item className="auth-form-action">
        <Button block type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginComponent;

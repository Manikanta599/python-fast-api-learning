import { Button, Form, Input } from "antd";
import { useEffect } from "react";

import type { LoginFormValues } from "../../types/user";

type LoginComponentProps = {
  initialUsername?: string;
  loading?: boolean;
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
};

function LoginComponent({
  initialUsername,
  loading = false,
  onSubmit,
}: LoginComponentProps) {
  const [form] = Form.useForm<LoginFormValues>();

  useEffect(() => {
    form.setFieldsValue({
      username: initialUsername ?? "",
    });
  }, [form, initialUsername]);

  return (
    <Form
      form={form}
      name="login"
      layout="vertical"
      onFinish={onSubmit}
      autoComplete="off"
      size="large"
    >
      <Form.Item<LoginFormValues>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Enter your username" />
      </Form.Item>

      <Form.Item<LoginFormValues>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>

      <Form.Item className="auth-form-action">
        <Button block type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginComponent;

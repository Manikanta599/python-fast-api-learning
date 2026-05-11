import { App as AntApp, Card, Col, Row, Tabs, Typography } from "antd";
import { useState } from "react";

import { createUser, loginUser } from "./api/users";
import LoginComponent from "./components/auth/LoginComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";
import type { LoginFormValues, SignUpFormValues } from "./types/user";

function App() {
  const { message } = AntApp.useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [initialUsername, setInitialUsername] = useState("");

  async function handleLogin(values: LoginFormValues) {
    setLoginLoading(true);

    try {
      const response = await loginUser(values);
      message.success(response.message);
      setIsLoggedIn(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Could not login";
      message.error(errorMessage);
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleSignUp(values: SignUpFormValues) {
    setSignUpLoading(true);

    try {
      const response = await createUser({
        full_name: values.fullName,
        email: values.email,
        username: values.username,
        password: values.password,
      });

      message.success(response.message);
      setInitialUsername(response.user.username);
      setActiveTab("login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Could not create account";
      message.error(errorMessage);
    } finally {
      setSignUpLoading(false);
    }
  }

  const tabItems = [
    {
      key: "login",
      label: "Login",
      children: (
        <LoginComponent
          initialUsername={initialUsername}
          loading={loginLoading}
          onSubmit={handleLogin}
        />
      ),
    },
    {
      key: "signup",
      label: "Sign Up",
      children: (
        <SignUpComponent loading={signUpLoading} onSubmit={handleSignUp} />
      ),
    },
  ];

  if (isLoggedIn) {
    return <ProductsPage />;
  }

  return (
    <div className="auth-shell">
      <div className="auth-glow auth-glow-left" />
      <div className="auth-glow auth-glow-right" />

      <Row justify="center" align="middle" className="auth-row">
        <Col xs={24} sm={20} md={14} lg={10} xl={8}>
          <Card className="auth-card" bordered={false}>
            <Typography.Text className="auth-badge">Welcome</Typography.Text>
            <Typography.Title level={2} className="auth-title">
              Access your account
            </Typography.Title>
            <Typography.Paragraph className="auth-subtitle">
              Login if you already have an account, or create a new one with
              the sign up form.
            </Typography.Paragraph>

            <Tabs
              activeKey={activeTab}
              centered
              items={tabItems}
              onChange={setActiveTab}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;

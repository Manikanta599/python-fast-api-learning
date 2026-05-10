import { Card, Col, Row, Tabs, Typography } from "antd";

import LoginComponent from "./components/auth/LoginComponent";
import SignUpComponent from "./components/auth/SignUpComponent";
import "./App.css";

const tabItems = [
  {
    key: "login",
    label: "Login",
    children: <LoginComponent />,
  },
  {
    key: "signup",
    label: "Sign Up",
    children: <SignUpComponent />,
  },
];

function App() {
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

            <Tabs defaultActiveKey="login" centered items={tabItems} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;

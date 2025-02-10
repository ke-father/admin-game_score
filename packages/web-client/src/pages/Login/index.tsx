import React from 'react';
import { Form, Input, Button, Tabs, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { setToken, setUser } from '@/store/slices/authSlice';
import { login } from '@/services/auth';
import '@/styles/auth.scss';

interface LoginForm {
  username: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginForm) => {
    try {
      const response = await login(values);
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error('登录失败：' + (error as Error).message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <p className="auth-subtitle">欢迎使用篮球计分器</p>
        <p className="auth-desc">请登录您的账号以继续使用</p>

        <div className="auth-form">
          <Tabs
            defaultActiveKey="account"
            centered
            items={[
              {
                key: 'scan',
                label: '扫码登录',
                children: (
                  <div className="auth-qr">
                    <div className="auth-qr-code">
                      <div className="qr-placeholder">
                        <div className="qr-inner">
                          <div className="qr-loading">
                            <Spin />
                            <p>二维码加载中...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>请使用微信扫码登录</p>
                  </div>
                ),
              },
              {
                key: 'passwordless',
                label: '免密登录',
                children: (
                  <Form
                    form={form}
                    name="passwordless"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="phone"
                      rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined className="auth-input-icon" />}
                        placeholder="请输入手机号"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>
                    <Form.Item
                      name="code"
                      rules={[{ required: true, message: '请输入验证码' }]}
                    >
                      <div className="auth-code-input">
                        <Input
                          placeholder="请输入验证码"
                          size="large"
                          className="auth-input"
                        />
                        <Button size="large">获取验证码</Button>
                      </div>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" className="auth-submit">
                      登录
                    </Button>
                  </Form>
                ),
              },
              {
                key: 'account',
                label: '账密登录',
                children: (
                  <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: '请输入账号/邮箱' }]}
                    >
                      <Input
                        prefix={<UserOutlined className="auth-input-icon" />}
                        placeholder="请输入账号/邮箱"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入密码' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="auth-input-icon" />}
                        placeholder="请输入密码"
                        size="large"
                        className="auth-input"
                      />
                    </Form.Item>

                    <div className="auth-options">
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                        <label className="auth-checkbox">
                          <input type="checkbox" />
                          <span>记住我</span>
                        </label>
                      </Form.Item>
                      <a className="auth-forgot" onClick={() => navigate('/forgot-password')}>
                        忘记密码？
                      </a>
                    </div>

                    <Button type="primary" htmlType="submit" block size="large" className="auth-submit">
                      登录
                    </Button>
                  </Form>
                ),
              },
            ]}
          />

          <div className="auth-divider">
            <span>或者</span>
          </div>

          <div className="auth-social">
            <Button className="auth-social-btn auth-wechat">
              微信登录
            </Button>
            <Button className="auth-social-btn auth-phone">
              手机登录
            </Button>
          </div>
        </div>

        <div className="auth-link">
          还没有账号？<a onClick={() => navigate('/register')}>立即注册</a>
        </div>

        <div className="auth-footer">
          © 2024 篮球计分器 保留所有权利
        </div>
      </div>
    </div>
  );
};

export default Login;

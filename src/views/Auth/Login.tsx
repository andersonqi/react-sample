import React from 'react';
import { message } from 'antd';
import { Form, Input, Button } from 'antd';
import { login } from "../../redux/Auth/actions";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { PROPERTY_PREFIX_PATH } from '../../config/api';

import { LoginPayload } from "../../types/auth";

function Login(props: any) {
    const [loading, setLoading] = React.useState<boolean>(false);
    let history = useHistory()
    const dispatch = useDispatch();

    React.useEffect(() => {
        const loadUser = async () => {
            let accessToken = localStorage.getItem('token');
            if (accessToken) {
                history.push(`${PROPERTY_PREFIX_PATH}/dashboard`);
            }
        }
        loadUser();
    }, [dispatch, history]);

    const handleSubmit = async (values: LoginPayload) => {
        setLoading(true);
        let response: any = await dispatch(login(values));
        setLoading(false);

        if (response.error) {
            message.error('Oops. Something went wrong');
            return;
        }

        message.success('Login Successfull');

        setTimeout(() => {
            history.push(`${PROPERTY_PREFIX_PATH}/dashboard`);
        }, 200);
    }

    return (
        <div className="auth-container login-page">
            <div className="content_login">
                <div className="login_logo">
                    <img src="/logo_color.png" alt="App" />
                </div>
                <div className="login_form">
                    <div className="form-title">
                        <h3>Welcome Back!</h3>
                    </div>
                    <div className="content_form">
                        <Form name="basic" autoComplete="off" onFinish={handleSubmit}>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your email adress!' }]}>
                                <Input placeholder="Email Address" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" loading={loading} htmlType="submit" block style={{ background: "#102934", borderColor: "#102934" }}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
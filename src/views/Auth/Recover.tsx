import React from 'react';
import Page from "../../components/Layout/auth";
import { Link } from "react-router-dom";
import { Form, Input, Button } from 'antd';

type Props = {};

function Recover(props: Props){
    return(
        <Page>
            <div className="content_login">
                <div className="login_logo">
                    <img src="/logo_color.png" alt="App" />
                </div>
                <div className="login_form">
                    <div className="form-title">
                        <h3>Forgot Password!</h3>
                    </div>
                    <div className="content_form">
                        <Form name="basic" autoComplete="off">
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your email adress!' }]}>
                            <Input placeholder="Email Address"/>
                        </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block style={{ background: "#102934", borderColor: "#102934" }}>
                                    Recover Password
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="forgot">
                        <Link to="/">Back to login</Link>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Recover;
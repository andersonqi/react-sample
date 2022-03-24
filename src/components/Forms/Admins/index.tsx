import React from 'react';
import { Form, Button, Col, Row, Input } from 'antd';

type Props = {
    handleSubmit: Function;
    handleCancel: Function
};

function CreateAdminForm(props: Props){

    const handleCancel = () => {
        props.handleCancel();
    };

    const onFinish = (values: any) => {
        props.handleSubmit(values);
    };

    return(
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item name="name" label="Full Name" rules={[
                        { required: true, message: 'Field required' },
                        { min: 3, message: 'The field must be at least 3 characters long'}]} >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                <Form.Item name="email" label="E-mail" rules={[
                    { required: true, message: 'Field required' },
                    { type: 'email', message: 'Enter a valid email'}]} >
                    <Input type="email" placeholder="" />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="password" label="Password" rules={[
                    { required: true, message: 'Field required' },
                    { min: 6, message: 'The field must be at least 6 characters long'}]} >
                    <Input type="password" placeholder="" />
                </Form.Item>
                </Col>
            </Row>

            <div style={{ textAlign: 'right' }}>
                <Button onClick={handleCancel} style={{ marginRight: 8 }} >
                    Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </div>
        </Form>
    )
}

export default CreateAdminForm;
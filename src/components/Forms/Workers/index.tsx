import React from 'react';
import { Form, Button, Col, Row, Input, Select } from 'antd';
const {Option} = Select;

type Props = {
    handleSubmit: Function;
    handleCancel: Function
};

function CreateWorkerForm(props: Props){

    const handleCancel = () => {
        props.handleCancel();
    };

    const onFinish = (values: any) => {
        props.handleSubmit(values);
    };

    return(
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="name" label="Name" rules={[
                        { required: true, message: 'Field required' },
                        { min: 3, message: 'El campo debe tener al menos 3 caracteres'}]} >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="lastname" label="Lastname" rules={[
                        { required: true, message: 'Field required' },
                        { min: 3, message: 'El campo debe tener al menos 3 caracteres'}]} >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="email" label="E-mail" rules={[
                        { required: true, message: 'Field required' },
                        { type: 'email', message: 'Ingrese un e-mail válido'}]}>
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="password" label="Password" rules={[
                        { required: true, message: 'Field required' },
                        { min: 6, message: 'El campo debe tener al menos 6 caracteres'}]}>
                        <Input placeholder="" type="password" />
                    </Form.Item>
                </Col>
                
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="phone" label="Teléfono" rules={[{ required: true, message: 'Field required' }]}>
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Field required' }]}>
                        <Select placeholder="">
                            <Option value="active">Active</Option>
                            <Option value="inactive">Inactive</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="address" label="Address" rules={[{ required: false, message: 'Field required' }]}>
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="zipCode" label="ZipCode" rules={[{ required: false, message: 'Field required' }]}>
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ textAlign: 'right'}}>
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </div>
        </Form>
    )
}

export default CreateWorkerForm;
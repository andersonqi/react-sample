import React from 'react';
import { Form, Button, Col, Row, Input, Select } from 'antd';

const {Option} = Select;

type Props = {
    handleSubmit: Function;
    handleCancel: Function
};

function CreatePropertyForm(props: Props){

    const handleCancel = () => {
        props.handleCancel();
    };

    const onFinish = (values: any) => {
        let data = {
          ...values,
          status: true
        }
        props.handleSubmit(data);
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
                <Form.Item name="countryCode" label="Countrie" rules={[{ required: true, message: 'Field required' }]}>
                    <Select placeholder="">
                        <Option value="USA">USA</Option>
                        <Option value="CRI">Costa Rica</Option>
                    </Select>
                </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[{ required: true, message: 'Field required'},
                { type: 'email', message: 'Ingrese un e-mail válido'}]}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[{ required: true, message: 'Field required'}, 
                { min: 6, message: 'El campo debe tener al menos 6 caracteres'}]}>
                <Input placeholder="" type="password" />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'right'}}>
            <Button
              onClick={handleCancel}
              style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save changes
            </Button>
          </div>
        </Form>
    )
}

export default CreatePropertyForm;
import React from 'react';
import { Form, Button, Col, Row, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

type Props = {
    handleSubmit: Function;
    handleCancel: Function
};

function CreatePlanForm(props: Props){

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
                        { min: 3, message: 'The field must be at least 3 characters long'}]} >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="price" label="Price" rules={[
                        { required: true, message: 'Field required' },
                      ]} >
                        <Input type="number" placeholder="" />
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item  name="description" label="Description" rules={[
                        { required: true, message: 'Field required' },
                        { min: 3, message: 'The field must be at least 3 characters long'}]} >
                        <TextArea rows={4} placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item  name="period" label="Period" rules={[
                        { required: true, message: 'Field required' }]} >
                        <Select placeholder="">
                            <Option value={'day'}>Day</Option>
                            <Option value={'week'}>Week</Option>
                            <Option value={'month'}>Month</Option>
                            <Option value={'year'}>Year</Option>
                        </Select>
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

export default CreatePlanForm;
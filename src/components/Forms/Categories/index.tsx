import React from 'react';
import { Form, Button, Col, Row, Input } from 'antd';

type Props = {
    handleSubmit: Function;
    handleCancel: Function
};

function CreateCategoryForm(props: Props){

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
              <Form.Item name="name" label="Name" rules={[
                { required: true, message: 'Field required' },
                { min: 5, message: 'El campo debe tener al menos 5 caracteres'}]} >
                <Input placeholder="" />
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

export default CreateCategoryForm;
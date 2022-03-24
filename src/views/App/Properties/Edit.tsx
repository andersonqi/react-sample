import React from 'react'
import { Input, Row, Col, Card, Form, Select, Button, message } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getProperty, updateProperty, changePassword } from "../../../redux/Properties/actions";
import BackButton from '../../../components/Utils/BackButton';
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';

const { Option } = Select;

type Props = {};

function EditProperty(props: Props){
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  const params = useParams<any>();
  const dispatch = useDispatch();
  const [formPassword] = Form.useForm();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      currentProperty: store.properties.currentProperty
    }
  });

  React.useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      await dispatch(getProperty(params.id));
      setLoading(false);
    }
    fetchProperty();
  }, [params.id, dispatch]);


  const handleUpdate = async (values: any) => {
    try {
      values.status = values.status === "active" ? true : false;
      await dispatch(updateProperty(state.currentProperty.id, values));
      message.success('Información actualizada correctamente');
    } catch (error) {
      message.error('Oops algo ha salido mal, Intentelo luego');
    }
  }

  const handleChangePassword = async (values: any) => {
    try {
      const res:any = await dispatch(changePassword(state.currentProperty.id, values));
      if(res.error){
        message.error(`Algo ha salido mal`);
      }else{
        message.success(`Se ha actualizado la contraseña correctamente`);
        formPassword.resetFields();
      }
    } catch (error) {
      message.error(`Algo ha salido mal`);
    }
  }

  const handleBack = () => {
    history.push(`${PROPERTY_PREFIX_PATH}/properties`)
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12}>
        <Card title={<BackButton title="Property Details" handleBack={handleBack} />} loading={loading}>
          {
            Object.keys(state.currentProperty).length > 0 ?
            <Form
                layout="vertical"
                name="login-form"
                hideRequiredMark
                onFinish={handleUpdate}
                initialValues={{
                  name: state.currentProperty.name,
                  countryCode: state.currentProperty.countryCode,
                  email: state.currentProperty.email,
                  status: state.currentProperty.status ? 'active' : 'inactive',
                }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Field required' }]}>
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
                

                <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Field required' }]}>
                  <Input placeholder="" />
                </Form.Item>

                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Field required' }]}>
                  <Select placeholder="" >
                    <Option value={'active'}>Active</Option>
                    <Option value={'inactive'}>Inactive</Option>
                  </Select>
                </Form.Item>

                <div style={{ textAlign: 'left' }}>
                  <Button type="primary" htmlType="submit">
                    Save changes
                  </Button>
                </div>
              </Form> : null
          }
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12}>
          <Card title="Change password">
              <Form hideRequiredMark form={formPassword} layout="vertical" name="update-password-guard" onFinish={handleChangePassword}>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="password" label="New password" rules={[{ required: true, message: 'Campo requerido' }]}>
                      <Input placeholder=""  type="password" />
                    </Form.Item>
                  </Col>
                </Row>
                <div style={{ textAlign: 'left' }}>
                  <Button type="primary" htmlType="submit">
                    Save changes
                  </Button>
                </div>
              </Form>
          </Card>
        </Col>
    </Row>
  )
}

export default EditProperty;
import React from 'react'
import { Input, Row, Col, Card, Form, Select, Button, message } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAdmin, updateAdmin, changePassword } from "../../../redux/Admins/actions";
import BackButton from '../../../components/Utils/BackButton';
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';

const { Option } = Select;

type Props = {};

function EditAdmin(props: Props) {
    const [loading, setLoading] = React.useState(true);
    const history = useHistory();
    const params = useParams<any>();
    const dispatch = useDispatch();
    const [formPassword] = Form.useForm();

    const state = useSelector((store: Store) => {
        return {
            property: store.auth.user,
            currentAdmin: store.admins.currentAdmin
        }
    });

    React.useEffect(() => {
        const fetchAdmin = async () => {
            setLoading(true);
            await dispatch(getAdmin(params.id));
            setLoading(false);
        }
        fetchAdmin();
    }, [params.id, dispatch]);


    const handleUpdate = async (values: any) => {
        try {
            values.status = values.status === "active" ? true : false;
            await dispatch(updateAdmin(state.currentAdmin.id, values));
            message.success('Admin updated successfully');
        } catch (error) {
            message.error('Something went wrong');
        }
    }

    const handleChangePassword = async (values: any) => {
        try {
            const res: any = await dispatch(changePassword(state.currentAdmin.id, values));
            if (res.error) {
                message.error(`Something went wrong`);
            } else {
                message.success(`Admin password updated successfully`);
                formPassword.resetFields();
            }
        } catch (error) {
            message.error(`Something went wrong`);
        }
    }

    const handleBack = () => {
        history.push(`${PROPERTY_PREFIX_PATH}/admins`)
    }

    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
                <Card title={<BackButton title="Property Details" handleBack={handleBack} />} loading={loading}>
                    {
                        state.currentAdmin && Object.keys(state.currentAdmin).length > 0 ?
                            <Form
                                layout="vertical"
                                name="login-form"
                                onFinish={handleUpdate}
                                initialValues={{
                                    name: state.currentAdmin.name,
                                    email: state.currentAdmin.email,
                                    status: state.currentAdmin.status ? 'active' : 'inactive',
                                }}>

                                <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Field required' }]}>
                                    <Input placeholder="" />
                                </Form.Item>

                                <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Field required' }]}>
                                    <Input placeholder="" readOnly />
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
                            </Form> 
                        : null
                    }
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Card title="Change password">
                    <Form form={formPassword} layout="vertical" name="update-password-guard" onFinish={handleChangePassword}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="password" label="New password" rules={[{ required: true, message: 'Campo requerido' }]}>
                                    <Input placeholder="" type="password" />
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

export default EditAdmin;
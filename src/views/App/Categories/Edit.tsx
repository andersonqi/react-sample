import React from 'react'
import { Input, Row, Col, Card, Form, Select, Button, message } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getCategory, updateCategory} from "../../../redux/Categories/actions";
import BackButton from '../../../components/Utils/BackButton';
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';

const { Option } = Select;

type Props = {};

function EditCategory(props: Props) {
    const [loading, setLoading] = React.useState(true);
    const history = useHistory();
    const params = useParams<any>();
    const dispatch = useDispatch();

    const state = useSelector((store: Store) => {
        return {
            property: store.auth.user,
            currentCategory: store.categories.currentCategory
        }
    });

    React.useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            await dispatch(getCategory(params.id));
            setLoading(false);
        }
        fetchCategory();
    }, [params.id, dispatch]);


    const handleUpdate = async (values: any) => {
        try {
            values.status = values.status === "active" ? true : false;
            await dispatch(updateCategory(state.currentCategory.id, values));
            message.success('Category updated successfully');
        } catch (error) {
            message.error('Something went wrong');
        }
    }

    const handleBack = () => {
        history.push(`${PROPERTY_PREFIX_PATH}/categories`)
    }

    return (
        <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
                <Card title={<BackButton title="Property Details" handleBack={handleBack} />} loading={loading}>
                    {
                        state.currentCategory && Object.keys(state.currentCategory).length > 0 ?
                            <Form
                                layout="vertical"
                                name="login-form"
                                onFinish={handleUpdate}
                                initialValues={{
                                    name: state.currentCategory.name,
                                    status: state.currentCategory.status ? 'active' : 'inactive',
                                }}>

                                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Field required' }]}>
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
                            </Form> 
                        : null
                    }
                </Card>
            </Col>
        </Row>
    )
}

export default EditCategory;
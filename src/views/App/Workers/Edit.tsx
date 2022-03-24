import React from 'react'
import { Input, Row, Col, Card, Form, Select, Button, message } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import {getWorker, updateWorker, sendWorkerNotification} from "../../../redux/Workers/actions";
import BackButton from '../../../components/Utils/BackButton';
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';

const { Option } = Select;
const { TextArea } = Input;

type Props = {};

function EditWorker(props: Props){
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  const params = useParams<any>();
  const dispatch = useDispatch();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      currentWorker: store.workers.currentWorker
    }
  });

  React.useEffect(() => {
    const fetchWorker = async () => {
      setLoading(true);
      await dispatch(getWorker(params.id));
      setLoading(false);
    }
    fetchWorker();
  }, [params.id, dispatch]);

  const handleUpdate = async (values: any) => {
    try {
      values.avatar = '';

      setLoading(true);
      let res: any = await dispatch(updateWorker(state.currentWorker?.id, values));
      setLoading(false);

      if(!res.error){
        message.success('Se ha actualizado el usuario correctamente');
        await dispatch(getWorker(params.id));
      }else {
        message.error('Algo ha salido mal. Intentelo luego'); 
      }

    } catch (error) {
      setLoading(false);
      message.error('Algo ha salido mal. Intentelo luego')
    }
  }

  const handleSendNotification = async (values: any) => {
    try {

      setLoading(true);
      let res: any = await dispatch(sendWorkerNotification(state.currentWorker?.id, values));
      setLoading(false);

      if(res.error){
        message.error('Something went wrong')
        return
      }


      message.success('Notification sent successfully');

    } catch (error) {
      setLoading(false);
      message.error('Something went wrong')
    }
  }

  const handleBack = () => {
    history.push(`${PROPERTY_PREFIX_PATH}/workers`)
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12}>
        <Card title={<BackButton title="Worker details" handleBack={handleBack} />} loading={loading}>
          {state.currentWorker && Object.keys(state.currentWorker).length > 0 && (
            <Form 
              layout="vertical" 
              hideRequiredMark
              initialValues={{
                name: state.currentWorker.name,
                lastname: state.currentWorker.lastname,
                email: state.currentWorker.email,
                phone: state.currentWorker.phone,
                status: state.currentWorker.status
              }}
              onFinish={handleUpdate}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Field required' }]} >
                            <Input placeholder="" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="lastname" label="Lastname" rules={[{ required: true, message: 'Field required' }]} >
                            <Input placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Campo requerido' }]} >
                            <Input placeholder="" readOnly/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="phone" label="Teléfono" rules={[{ required: true, message: 'Campo requerido' }]} >
                            <Input placeholder="" />
                        </Form.Item>
                    </Col>
                </Row>
  
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="status"
                        label="Estado"
                        rules={[{ required: true, message: 'Campo requerido' }]}>
                            <Select placeholder="">
                                <Option value={'active'}>Activo</Option>
                                <Option value={'inactive'}>Inactivo</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
  
                <Actions>
                    <Button type="primary" htmlType="submit">
                      Save changes
                    </Button>
                </Actions>
          </Form>
          )}
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12}>
        <Card title={'Send Notification'} loading={loading}>
          <Form 
              layout="vertical" 
              hideRequiredMark
              onFinish={handleSendNotification}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Field required' }]} >
                            <Input placeholder="" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Field required' }]} >
                            <TextArea rows={5} />
                        </Form.Item>
                    </Col>
                </Row>
  
                <Actions>
                    <Button type="primary" htmlType="submit">
                      Send
                    </Button>
                </Actions>
          </Form>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24}>
          <Card title="Subscriptions">

          </Card>
      </Col>
    </Row>
  )
}

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default EditWorker;
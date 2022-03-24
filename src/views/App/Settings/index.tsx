import React from 'react'
import { Input, Row, Col, Card, Form, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getSettings, updateSettings } from '../../../redux/Settings/actions';
import styled from 'styled-components';
import {Store} from "../../../types/state";

type Props = {};

function Settings(props: Props){
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      currentSetting: store.settings.currentSetting
    }
  });

  React.useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await dispatch(getSettings());
      setLoading(false);
    }
    fetchSettings();
  }, [dispatch]);

  const handleUpdate = async (values: any) => {
    try {

      values.configuration = {...values};

      delete values.version;
      delete values.trial_days;

      setLoading(true);
      let res: any = await dispatch(updateSettings(state.currentSetting.id, values));
      setLoading(false);

      if(!res.error){
        message.success('Configuration updated successfully');
      }

    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12}>
        <Card title={'Configuration'} loading={loading}>
         {Object.keys(state.currentSetting).length > 0 && (
            <Form 
              layout="vertical" 
              hideRequiredMark
              initialValues={{
                version: state.currentSetting?.configuration?.version,
                trial_days: state.currentSetting?.configuration?.trial_days
              }}
              onFinish={handleUpdate}>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="version" label="Version" rules={[{ required: true, message: 'Campo requerido' }]} >
                        <Input placeholder="" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="trial_days" label="Trial Days (Subscriptions)" rules={[{ required: true, message: 'Campo requerido' }]} >
                        <Input placeholder="" type="number" />
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
    </Row>
  )
}

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export default Settings;
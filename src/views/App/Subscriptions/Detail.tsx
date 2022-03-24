import React from 'react'
import { Row, Col, Card, Descriptions } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {getSubscription} from "../../../redux/Subscriptions/actions";
import BackButton from '../../../components/Utils/BackButton';
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';

type Props = {};

function DetailSubscription(props: Props){
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  const params = useParams<any>();
  const dispatch = useDispatch();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      currentSubscription: store.subscriptions.currentSubscription
    }
  });

  React.useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      await dispatch(getSubscription(params.id));
      setLoading(false);
    }
    fetchService();
  }, [params.id, dispatch]);

  const handleBack = () => {
    history.push(`${PROPERTY_PREFIX_PATH}/subscriptions`)
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title={<BackButton title={`Subscription Detail`} handleBack={handleBack} />} loading={loading}>
          <Descriptions layout="vertical">
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Worker">{`${state.currentSubscription.worker?.name} ${state.currentSubscription.worker?.lastname}`}</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Price">{`${state.currentSubscription.price}`}</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Status">{ state.currentSubscription.status }</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  )
}

export default DetailSubscription;
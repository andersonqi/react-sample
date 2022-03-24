import React from 'react'
import { Row, Col, Card, Descriptions } from 'antd';
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {getWork} from "../../../redux/Works/actions";
import BackButton from '../../../components/Utils/BackButton';
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';
import { parseDate } from '../../../utils/date';

type Props = {};

function DetailService(props: Props){
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  const params = useParams<any>();
  const dispatch = useDispatch();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      currentWork: store.works.currentWork
    }
  });

  React.useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      await dispatch(getWork(params.id));
      setLoading(false);
    }
    fetchService();
  }, [params.id, dispatch]);

  const handleBack = () => {
    history.push(`${PROPERTY_PREFIX_PATH}/services`)
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={24}>
        <Card title={<BackButton title={`Services Detail #${state.currentWork.number}`} handleBack={handleBack} />} loading={loading}>
          <Descriptions layout="vertical">
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Property">{state.currentWork.property?.name}</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Customer">{`${state.currentWork.user?.name} ${state.currentWork.user?.lastname}`}</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Service Date">{ parseDate(state.currentWork.workDate, 'DD/MM/YYYY')}</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Amount">${ state.currentWork.amount }</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Status">{ state.currentWork.status }</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Categories">{ state.currentWork.categories?.join() }</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="State">${ state.currentWork.state }</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="City" span={2}>${ state.currentWork.city }</Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Title" span={4}>
              { state.currentWork.title }
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Indications" span={4}>{ state.currentWork.indications }</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  )
}

export default DetailService;
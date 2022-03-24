import React from 'react';
import { Row, Col, Card } from 'antd';
import { Column, Line } from '@ant-design/charts';
import { useSelector, useDispatch } from 'react-redux';
import { getStatistics } from '../../../redux/Statistics/actions';
import styled from 'styled-components';
import moment from 'moment';

import Page from '../../../components/Layout/page';
import { Store } from '../../../types/state';

function Dashboard(props: any) {
    const [services, setServices] = React.useState([]);
    const [subscriptions, setSubscriptions] = React.useState([]);
    const dispatch = useDispatch();

    const state = useSelector((store: Store) => {
        return{
            site: store.statistics.statistics
        }
    });

    React.useEffect(() => {
        const fetchData = async () => {
            await dispatch(getStatistics());
        }
        fetchData();
    }, [dispatch]);

    React.useEffect(() => {
        const parseData = () => {
            
            let resultServices: any = [];
            let resultSubscriptions: any = [];
            
            state.site?.services?.map((item: any) => {
                resultServices.push({
                    year: moment(item.month).format('MMM'),
                    value: Number(item.count)
                });
                return resultServices;
            });

            state.site?.subscriptions?.map((item: any) => {
                resultSubscriptions.push({
                    year: moment(item.month).format('MMM'),
                    value: Number(item.count)
                });
                return resultSubscriptions;
            });
            
            setServices(resultServices);
            setSubscriptions(resultSubscriptions);
        }
        parseData();
    }, [state.site]);

    const configService = {
        data: services,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };

    const configSubscriptions = {
        data: subscriptions,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };

    return (
        <Page title="Dashboard">
            <Row gutter={10}>
                <Col span={8}>
                    <Card title="Active Properties">
                        <Total>{state.site.totalProperties}</Total>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Active Users">
                        <Total>{state.site.totalUsers}</Total>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Active Workers">
                        <Total>{state.site.totalWorkers}</Total>
                    </Card>
                </Col>
            </Row>

            <Row gutter={10}>
                <Col span={12}>
                    <Card title="Services">
                        <Column {...configService} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Subscriptions">
                        <Line {...configSubscriptions} />
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}

const Total = styled.span`
    color: #000;
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 20px;
`;

export default Dashboard;
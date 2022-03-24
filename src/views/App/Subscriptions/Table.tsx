/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Table, Input, Tag } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';
import { Subscription } from '../../../types/subscriptions';
import utils from "../../../utils/utils";
import { parseUnix } from '../../../utils/date';
import Flex from "../../../components/Utils/Flex";

type Props = {};

function SubscriptionTable(props: Props) {
  const history = useHistory();

    const state = useSelector((store: Store) => {
        return {
            property: store.auth.user,
            subscriptions: store.subscriptions.subscriptions
        }
    });

  const handleDetail = (id: number) => {
    history.push(`${PROPERTY_PREFIX_PATH}/subscriptions/${id}`)
  }

  const tableColumns = [
    {
      title: 'Worker',
      dataIndex: 'name',
      render: (_: any, record: Subscription) => (
        <div className="d-flex">
          <span>{`${record.worker.name} ${record.worker.lastname}`}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_: any, record: Subscription) => (
        <div className="d-flex">
          <span>{record.price}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'price')
    },
    {
        title: 'Period End',
        dataIndex: 'price',
        render: (_: any, record: Subscription) => (
          <div className="d-flex">
            <span>{ parseUnix(record.current_period_end, 'DD/MM/YYYY') }</span>
          </div>
        ),
        sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'price')
    },
    {
        title: 'Trial End',
        dataIndex: 'price',
        render: (_: any, record: Subscription) => (
          <div className="d-flex">
            <span>{ parseUnix(record.trial_end, 'DD/MM/YYYY') }</span>
          </div>
        ),
        sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'price')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: Subscription) => (
        <><Tag color={record.status === 'active' ? 'success' : 'blue'}>{record.status === 'active' ? 'Active' : record.status }</Tag></>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'status')
    },
    {
      title: 'Details',
      dataIndex: 'actions',
      render: (_: any, record: any) => (
        <div className="text-left cursor-pointer" onClick={() => handleDetail(record.id)}>
          <EyeOutlined />
        </div>
      )
    }
  ];

  const onSearch = (e: any) => {

  }

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input placeholder="Buscar" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
          </div>
        </Flex>
        <div>

        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={state.subscriptions}
          rowKey='id'
        />
      </div>
    </Card>
  )
}

export default SubscriptionTable;
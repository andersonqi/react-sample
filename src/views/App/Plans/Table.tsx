/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Table, Input, Button, Tag } from 'antd';
import { EyeOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';
import { Plan } from '../../../types/plans';
import utils from "../../../utils/utils";
import Flex from "../../../components/Utils/Flex";

type Props = { toggleDrawer: Function };

function PlanTable(props: Props) {
  const history = useHistory();

    const state = useSelector((store: Store) => {
        return {
            property: store.auth.user,
            plans: store.plans.plans
        }
    });

  const handleDetail = (id: number) => {
    history.push(`${PROPERTY_PREFIX_PATH}/plans/${id}`)
  }

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_: any, record: Plan) => (
        <div className="d-flex">
          <span>{`${record.name}`}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (_: any, record: Plan) => (
        <div className="d-flex">
          <span>{record.price}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'price')
    },
    {
      title: 'Period',
      dataIndex: 'period',
      render: (_: any, record: Plan) => (
        <div className="d-flex">
          <span>{record.period}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'period')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: Plan) => (
        <><Tag color={record.status ? 'blue' : 'red'}>{record.status ? 'Active' : 'Inactive'}</Tag></>
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
          <Button type="primary" icon={<PlusOutlined />} block onClick={() => props.toggleDrawer()}>New Plan</Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={state.plans}
          rowKey='id'
        />
      </div>
    </Card>
  )
}

export default PlanTable;
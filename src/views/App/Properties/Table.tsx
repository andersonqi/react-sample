/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Table, Input, Button, Tag } from 'antd';
import { EyeOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';
import { Property } from '../../../types/property';
import utils from "../../../utils/utils";
import Flex from "../../../components/Utils/Flex";

type Props = {
  toggleDrawer: Function;
};

function PropertyTable(props: Props) {
  const history = useHistory();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      properties: store.properties.properties
    }
  });

  const handleDetail = (id: number) => {
    history.push(`${PROPERTY_PREFIX_PATH}/properties/${id}`)
  }

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_: any, record: Property) => (
        <div className="d-flex">
          <span>{`${record.name}`}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'name')
    },
    {
      title: 'Country',
      dataIndex: 'country',
      render: (_: any, record: Property) => (
        <div className="d-flex">
          <span>{`${record.countryCode === 'USA' ? 'USA' : 'Costa Rica'}`}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'country')
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      render: (_: any, record: Property) => (
        <div className="d-flex">
          <span>{record.email}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'email')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: Property) => (
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
          <Button type="primary" icon={<PlusOutlined />} block onClick={() => props.toggleDrawer()}>New Property</Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={state.properties}
          rowKey='id'
        />
      </div>
    </Card>
  )
}

export default PropertyTable;
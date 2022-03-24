/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Table, Input, Button, Tag } from 'antd';
import { EyeOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';
import { Admin } from '../../../types/admins';
import utils from "../../../utils/utils";
import Flex from "../../../components/Utils/Flex";

type Props = {
  toggleDrawer: Function;
};

function AdminTable(props: Props) {
  const history = useHistory();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      admins: store.admins.admins
    }
  });

  const handleDetail = (id: number) => {
    history.push(`${PROPERTY_PREFIX_PATH}/admins/${id}`)
  }

  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_: any, record: Admin) => (
        <div className="d-flex">
          <span>{`${record.name}`}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'name')
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        render: (_: any, record: Admin) => (
          <div className="d-flex">
            <span>{`${record.email}`}</span>
          </div>
        ),
        sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'email')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: Admin) => (
        <><Tag color={record.status ? 'blue' : 'red'}>{record.status ? 'Active' : 'Inactive'}</Tag></>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'status')
    },
    {
      title: 'Details',
      dataIndex: 'actions',
      render: (_: any, record: Admin) => (
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
          <Button type="primary" icon={<PlusOutlined />} block onClick={() => props.toggleDrawer()}>New Admin</Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={state.admins}
          rowKey='id'
        />
      </div>
    </Card>
  )
}

export default AdminTable;
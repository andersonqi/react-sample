/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components';
import { Card, Table, Input, Button, Tooltip, Tag } from 'antd';
import { EyeOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';
import { Worker } from '../../../types/workers';
import utils from "../../../utils/utils";

import Flex from "../../../components/Utils/Flex";

type Props = {
  toggleDrawer: Function;
};

function UserList(props: Props){
    const history = useHistory();

    const state = useSelector((store: Store) => {
        return{
            property: store.auth.user,
            workers: store.workers.workers
        }
    });

    const handleDetail = (id: number) => {
      history.push(`${PROPERTY_PREFIX_PATH}/workers/${id}`);
    }
    
    const tableColumns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (_: any, record: Worker) => (
            <div className="d-flex">
              <span>{`${record.name} ${record.lastname}`}</span>
            </div>
          ),
          sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'property_name')
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          render: (_: any, record: Worker) => (
            <div className="d-flex">
              <span>{record.email}</span>
            </div>
          ),
          sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'title')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            render: (_: any, record: Worker) => (
              <div className="d-flex">
                <span>{record.phone}</span>
              </div>
            ),
            sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'title')
        },
        {
          title: 'Status',
          dataIndex: 'status',
          render: (_: any, record: Worker) => (
            <><Tag color={record.status ? 'blue' : 'red'}>{record.status ? 'Activo' : 'Inactivo'}</Tag></>
          ),
          sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'status')
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          render: (_: any, record: Worker) => (
            <Actions>
              <Tooltip title="Detalles del usuario">
                <div className="cursor-pointer" onClick={() => handleDetail(record.id)}>
                  <EyeOutlined />
                </div>
              </Tooltip>
            </Actions>
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
              <Button type="primary" icon={<PlusOutlined />} block onClick={() => props.toggleDrawer()}>New Worker</Button>
            </div>
          </Flex>
          <div className="table-responsive">
            <Table
              columns={tableColumns}
              dataSource={state.workers}
              rowKey='id'
            />
          </div>
        </Card>
      )
}

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default UserList



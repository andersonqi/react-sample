/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components';
import { Card, Table, Input, Tooltip, Tag, DatePicker } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { PROPERTY_PREFIX_PATH } from '../../../config/api';
import { Store } from '../../../types/state';
import { Work } from '../../../types/work';
import utils from "../../../utils/utils";
import { parseDate } from '../../../utils/date';

import Flex from "../../../components/Utils/Flex";

const { RangePicker } = DatePicker;

type Props = {
  handleDateChange: Function;
};

function WorkList(props: Props) {
  const history = useHistory();

  const state = useSelector((store: Store) => {
    return {
      property: store.auth.user,
      works: store.works.works,
      loading: store.works.loading
    }
  });

  const handleDetail = (id: number) => {
    history.push(`${PROPERTY_PREFIX_PATH}/services/${id}`);
  }

  const tableColumns = [
    {
      title: 'Number',
      dataIndex: 'number',
      render: (_: any, record: Work) => (
        <div className="d-flex">
          <span>{`${record.number}`}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'number')
    },
    {
      title: 'Property',
      dataIndex: 'property',
      render: (_: any, record: Work) => (
        <div className="d-flex">
          <span>{record.property.name}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'property')
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: (_: any, record: Work) => (
        <div className="d-flex">
          <span>{`${record.user.name}`}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'property')
    },
    {
      title: 'Title',
      dataIndex: 'title',
      render: (_: any, record: Work) => (
        <div className="d-flex">
          <span>{record.title}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'title')
    },
    {
      title: 'Amount',
      dataIndex: 'phone',
      render: (_: any, record: Work) => (
        <div className="d-flex">
          <span>{record.amount}</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'title')
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, record: Work) => (
        <><Tag color={record.status ? 'blue' : 'red'}>{record.status ? 'Active' : 'Inactive'}</Tag></>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'status')
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (_: any, record: Work) => (
        <div className="d-flex">
          <span>{ parseDate(record.workDate, 'DD/MM/YYYY') }</span>
        </div>
      ),
      sorter: (a: any, b: any) => utils.antdTableSorter(a, b, 'title')
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_: any, record: Work) => (
        <Actions>
          <Tooltip title="Details">
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
        <Actions>
          <FilterTitle>Filter:</FilterTitle>
          <RangePicker onChange={(date, dateString) => props.handleDateChange(date, dateString)} />
        </Actions>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={state.works}
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

const FilterTitle = styled.span`
  color: #000;
  padding-right: 10px;
`;

export default WorkList;
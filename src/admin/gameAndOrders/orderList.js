import React, {useEffect, useState, useMemo} from 'react';
import { Table, Button, message} from 'antd';
import moment from 'moment'

const OrderList = ({orders}) => {
  const columns = [
    {
    title: 'Game Name',
    dataIndex: 'gameName',
    key: 'name',
  },
  {
    title:"Price",
    dataIndex:'price',
    key:'price'
  },
  {
    title:"User Id",
    dataIndex:'userId',
    key:'userId'
  },
  {
    title:"Code",
    dataIndex:'code',
    key:'code'
  },
  {
    title:"Order From",
    dataIndex:'from',
    key:'from'
  },
  {
    title:'Order Date',
    key:'createdAt',
    render:(record) => {
      return <span>
        {moment(record.createdAt).format("LLL")}
      </span>
    }
  }
]
  return <Table columns={columns} dataSource={orders} />
}

export default OrderList;
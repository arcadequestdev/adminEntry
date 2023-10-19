import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Tabs, Table } from 'antd';
import styled from "styled-components";
import moment from "moment";
import ExchangeOrders from "./components/exchangeOrders";

const { TabPane } = Tabs;

const Exchange = ({players, streamers, admins}) => {
  
  const activeSubs = useMemo(() => {
    const users = players.concat(streamers).concat(admins);
    const subs = users.filter((item) => item.multiplier && moment(item.multiplier.renewAt).isAfter(moment()));
    return subs;
  }, [players, streamers, admins]);

  const unActiveSubs =  useMemo(() => {
    const users = players.concat(streamers).concat(admins);
    const subs = users.filter((item) => item.multiplier && moment(item.multiplier.renewAt).isBefore(moment()));
    return subs;
  }, [players, streamers, admins]);

  const timeSortStartAt = useCallback((a,b) => {
    const timeA = moment(a.multiplier.startAt);
    const timeB = moment(b.multiplier.startAt);
    if(timeA.isBefore(timeB)){
      return -1;
    }else {
      return 1;
    }
  },[])

  const timeSortRenewAt = useCallback((a,b) => {
    const timeA = moment(a.multiplier.renewAt);
    const timeB = moment(b.multiplier.renewAt);
    if(timeA.isBefore(timeB)){
      return -1;
    }else {
      return 1;
    }
  },[])


  const activeSubsColumn = [
    {
      title:"Name",
      dataIndex:"first_name",
      key:"first_name",
    },
    {
      title:"Email",
      dataIndex:"email",
      key:"email"
    },
    {
      title:"Subscribe From",
      key:"subOption",
      render:(record) => {
        if(record.multiplier.subOption === 1) return "Web"
        else {
          return "Mobile"
        }
      },
      
    },
    {
      title:"Start Sub At",
      key:"startAt",
      render:(record) => {
        return moment(record.multiplier.startAt).format("l")
      },
      sorter:timeSortStartAt
    },
    {
      title:"Next Renew At",
      key:"renewAt",
      render:(record) => {
        return moment(record.multiplier.renewAt).format("l")
      },
      sorter:timeSortRenewAt
    },
  ];

  const getUserEmail = (userId) => {
    const target = players.find(item => item.userId === userId);
    if(target){
      return target.email
    }else {
      return '--'
    }
  }


  return <Tabs defaultActiveKey="2" size="large">
    <TabPane tab="Multiplier Subs" key="1">
      <Container>
<h3>Active Subs</h3>
      <Table
    columns={activeSubsColumn}
    
    dataSource={activeSubs}
  />
<h3>Unactive Subs</h3>
<Table
    columns={activeSubsColumn}
    
    dataSource={unActiveSubs}
  />
      </Container>
      </TabPane>
      <TabPane tab="Exchange Order" key="2">
        <ExchangeOrders getUserEmail={getUserEmail}/>
      </TabPane>
  </Tabs>
}

const Container = styled.div`
width:100%;
min-height:600px;
overflow-y:scroll;
padding:0px 24px;
`;


export default Exchange;
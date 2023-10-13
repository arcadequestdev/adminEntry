import React, {useState, useMemo, useCallback } from "react";
import { Tabs, Table, Button } from 'antd';
import styled from "styled-components";
import moment from "moment"
import { ExportToCsv } from 'export-to-csv';

const { TabPane } = Tabs;

const Subscribers = ({players}) => {
  const activeSubs = useMemo(() => {
    return players.filter(item => item.renewAt && moment(item.renewAt).isAfter(moment()) && !item.isInTrial);
  },[players]);
  const currentTrialSubs =  useMemo(() => {
    return players.filter(item => item.renewAt && moment(item.renewAt).isAfter(moment()) && item.isInTrial);
  },[players]);
  const unactiveSubs = useMemo(() => {
    return players.filter(item => item.renewAt && moment(item.renewAt).isBefore(moment()));
  }, [players]);
  const timeSort = useCallback((a,b) => {
    const timeA = moment(a.startAt);
    const timeB = moment(b.startAt);
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
        if(record.subOption === 1) return "Web"
        else {
          return "Mobile"
        }
      },
      
    },
    {
      title:"Start Sub At",
      key:"startAt",
      render:(record) => {
        return moment(record.startAt).format("l")
      },
      sorter:timeSort
    },
    {
      title:"Next Renew At",
      key:"renewAt",
      render:(record) => {
        return moment(record.renewAt).format("l")
      },
      sorter:timeSort
    },
    {
      title:"SubLevel",
      key:"subLevel",
      dataIndex:"subLevel"
    },
    {
      title:"Montly Pass Left",
      key:"monthlyPass",
      dataIndex:'monthlyPass'
    }
  ];

  const unActiveSubsColumn = [
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
        if(record.subOption === 1) return "Web"
        else {
          return "Mobile"
        }
      }
    },
    {
      title:"Start Sub At",
      key:"startAt",
      render:(record) => {
        return moment(record.startAt).format("l")
      },
      sorter:timeSort
    },
    {
      title:"Expired At",
      key:"renewAt",
      render:(record) => {
        return moment(record.renewAt).format("l")
      },
      sorter:timeSort
    },
    {
      title:"End With Trial",
      key:"isInTrial",
      render:(record) => {
        if(record.isInTrial) return "yes";
        else {
          return "false"
        }
      }
    }
  ];

  const exportToCsvSubs = (source) => {
    const data = [];
    for (let i = 0; i < source.length; i++) {
      const user = source[i];
      const { email, first_name, renewAt } = user;
      const item = {
        email,
        name:first_name,
        expiredAt:moment(renewAt).format("l")
      };
      data.push(item);
    };
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'ArcadeQuest Subscribers',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
   
  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(data);
  }

  return <Tabs defaultActiveKey="1" size="large">
    <TabPane tab="Active Subs" key="1">
      <Container>
      <Table
    columns={activeSubsColumn}
    
    dataSource={activeSubs}
  />
    <Button onClick={() => exportToCsvSubs(activeSubs)}>Export To CSV </Button>
      </Container>
    </TabPane>
    <TabPane tab="Current Trial Subs" key="2">
        <Container>
        <Table
    columns={activeSubsColumn}
    
    dataSource={currentTrialSubs}
  />
  <Button onClick={() => exportToCsvSubs(currentTrialSubs)}>Export To CSV </Button>
        </Container>
    </TabPane>
    <TabPane tab="Unactive Subs" key="3">
        <Container>
          <Table 
          columns={unActiveSubsColumn}
          dataSource={unactiveSubs}
          />
           <Button onClick={()=> exportToCsvSubs(unactiveSubs)}>Export To CSV </Button>
        </Container>
    </TabPane>
    </Tabs>
}


const Container = styled.div`
width:100%;
min-height:600px;
overflow-y:scroll;
padding:0px 24px;
`;


export default Subscribers;

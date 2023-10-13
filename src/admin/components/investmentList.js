import React, {useEffect, useState, useMemo} from 'react';
import Firebase from "../../util/firebase";
import styled from "styled-components";
import moment from "moment";
import { Table, Button, Input, message, Modal} from 'antd';
import * as API from "../../util/api";
import axios from "axios";
import LinkMatchModal from './linkMatchModal';

const InvestmentList = () => {
  const [investments, setInvestments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(null);

 useEffect(() => {
    const listener = Firebase.firestore()
    .collection("investment")
    .onSnapshot(function (snapshot){
      let result = [];
    snapshot.forEach((doc) => {
      const investment = {
        ...doc.data(),
        investmentId:doc.id
      };
      result.push(investment);
      })
      setInvestments(result)
    });
    return () => {
      listener();
    }
  },[]);

  const unpublicInvestment = useMemo(() => {
    const unpublic = investments.filter((item) => item.status === 0);
    return unpublic;
  },[investments]);

  const availableInvestment = useMemo(() => {
    const invests = investments.filter((item) => item.status === 1 || item.status === 2 );
    return invests;
  },[investments]);

  const cancelledInvestment = useMemo(() => {
    const invests = investments.filter((item) => item.status === 3 );
    return invests;
  }, [investments])

  const timeSortCloseDate = (a,b) => {
    const timeA = moment(a.closeDate);
    const timeB = moment(b.closeDate);
    if(timeA.isBefore(timeB)){
      return -1;
    }else {
      return 1;
    }
  }

  const timeSortStartDate = (a,b) => {
    const timeA = moment(a.expectedStartDate);
    const timeB = moment(b.expectedStartDate);
    if(timeA.isBefore(timeB)){
      return -1;
    }else {
      return 1;
    }
  }

  const publishInvestment = async (record) => {
    const {investmentId} = record;
    try {
      const requestBody = {
        investmentId
      }
      const url = API.PUBLISH_INVESTMENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Investment is published")
      }else {
        message.error("System Error")
      }
    }catch(err){
      message.error("System Error")
    }
  }

  const archiveInvestment = async (record) => {
    const {investmentId} = record;
    try {
      const requestBody = {
        investmentId
      }
      const url = API.ARCHIVED_INVESTMENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Investment is archived")
      }else {
        message.error("System Error")
      }
    }catch(err){
      message.error("System Error")
    }
  };

  const endInvestment = async (record) => {
    const {investmentId} = record;
    try {
      const requestBody = {
        investmentId
      }
      const url = API.END_INVESTMENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Investment is end, no more investors")
      }else {
        message.error("System Error")
      }
    }catch(err){
      message.error("System Error")
    }
  }

  const cancelInvestment = async(record) => {
    const {investmentId} = record;
    try {
      const requestBody = {
        investmentId
      }
      const url = API.CANCEL_INVESTMENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Investment is cancelled, this operation can't be recalled")
      }else {
        message.error("System Error")
      }
    }catch(err){
      message.error("System Error");
    }
  }


  const unpublicColumn = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title:"streamer",
      dataIndex:"streamerName",
      key:"streamerName"
    },
    {
      title:"target",
      dataIndex:"target",
      key:"target"
    },
    {
      title: "close date",
      render:(record) => {
        return moment(record.closeDate).format("l")
      },
      sorter:timeSortCloseDate
    },
    {
      title: "expect start date",
      render:(record) => {
        return moment(record.expectedStartDate).format("l")
      },
      sorter:timeSortStartDate
    },
    {
      title: 'Publish',
      key: 'publish',
      render: (record) => <Button type="primary" onClick={()=> {
        publishInvestment(record)
      }}>Publish</Button>,
    },
    {
      title: 'Achived',
      key: 'achived',
      render: (record) => <Button type="primary" onClick={()=> {
        archiveInvestment(record)
      }}>Archive</Button>,
    },
  ];

  const cancelledColumn = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title:"streamer",
      dataIndex:"streamerName",
      key:"streamerName"
    },
    {
      title:"target",
      dataIndex:"target",
      key:"target"
    },
    {
      title: "close date",
      render:(record) => {
        return moment(record.closeDate).format("l")
      },
      sorter:timeSortCloseDate
    },
    {
      title: "expect start date",
      render:(record) => {
        return moment(record.expectedStartDate).format("l")
      },
      sorter:timeSortStartDate
    }
  ];

  const avaiableColumn = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title:"streamer",
      dataIndex:"streamerName",
      key:"streamerName"
    },
    {
      title:"target",
      dataIndex:"target",
      key:"target"
    },
    {
      title: "close date",
      render:(record) => {
        return moment(record.closeDate).format("l")
      },
      sorter:timeSortCloseDate
    },
    {
      title: "expect start date",
      render:(record) => {
        return moment(record.expectedStartDate).format("l")
      },
      sorter:timeSortStartDate
    },
    {
      title: "Share Taken",
      render:(record) => {
        return record.shareTaken
      },
    },
    {
      title: "Status",
      render:(record) => {
        if(record.status === 1){
          return "Ongoing"
        }
        if(record.status === 2){
          return "Ended"
        }
      }
    },
    {
      title: '',
      key: 'end',
      render: (record) => 
      {
        if(record.status !== 2){
          return <Button type="primary" onClick={()=> {
            endInvestment(record)
          }}>End</Button>
        }
      },
    },
    {
      title: "",
      key:"cancel",
      render: (record) => <Button type="primary" onClick={()=> {
        cancelInvestment(record);
      }}>Cancel</Button>,
    },
    {
      title: "",
      key:"cancel",
      render: (record) => <Button type="primary" onClick={()=> {
        setCurrent(record);
        setModalOpen(true);
      }}>{
        record.linkedMatch ? "See Linked Match":"Link Match"
      }</Button>,
    }
  ];



  return <Container>
    <h3>Unpublic Investment</h3>
     <Table
    columns={unpublicColumn}
    dataSource={unpublicInvestment}
    style={{marginBottom:24}}
    pagination={{
      pageSize:5
    }}
  />
  <h3>Public Investment</h3>
  <Table
    columns={avaiableColumn}
    dataSource={availableInvestment}
    style={{marginBottom:24}}
    pagination={{
      pageSize:5
    }}
  />
  <h3>Cancelled Investment</h3>
  <Table
    columns={cancelledColumn}
    dataSource={cancelledInvestment}
    style={{marginBottom:24}}
    pagination={{
      pageSize:5
    }}
  />
  <LinkMatchModal
   current={current}
   modalOpen={modalOpen}
  setModalOpen={setModalOpen}
  setCurrent={setCurrent}
  />
  </Container>
}

const Container = styled.div`
width:100%;
min-height:600px;
overflow-y:scroll;
padding:0px 24px;
`;

export default InvestmentList;





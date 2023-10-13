import React, { useEffect, useState, useMemo } from "react";
import Firebase from "../../util/firebase";
import { Table, Button, Modal, Input, Tabs, List } from "antd";
import * as API from "../../util/api";
import axios from "axios";
import Orders from "./Orders";
import { debounce } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import moment from 'moment';
const { TabPane } = Tabs;

const PrizeBank = () => {
  const [bank, setBank] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const ascCompare = (a, b) => {
    const opt1 = a.prize_option;
    const opt2 = b.prize_option;
    if (opt1 <opt2) {
      return -1;
    }
    if (opt1 > opt2) {
      return 1;
    }
    return 0;
  };

  

  useEffect(() => {
    const listener = Firebase.firestore()
      .collection("prize_bank")
      .onSnapshot(function (snapshot){
      let result = [];
      snapshot.forEach((doc) => {
        const obj = {
          ...doc.data(),
          bankId:doc.id
        };
        result.push(obj);
      });
      result = result.sort(ascCompare);
      setBank(result);
      })
    
    return () => {
      listener();
    }
  }, []);

  const debounceAddCode = debounce(() => {
    addCodeTobank()
  }, 500);

  const bank_columns = [
    {
      title: "Prize Name",
      dataIndex: "prize_name",
      key: "prize_name",
    },
    {
      title:"Prize Option",
      dataIndex:"prize_option",
      key:"prize_option"
    },
    {
      title: "Available Codes",
      render:(record) => <span>
        {record?.available?.length??0}
      </span>,
      key: "available",
    },
    {
      title: "Used Codes",
      render:(record) => <span>
      {record?.used?.length ?? 0}
    </span>,
      key: "used",
    },
    {
      title: 'Action',
      key: 'operation',
      render: (record) => <Button type="primary" onClick={()=> {
        openAddModal(record)
      }}>Add Code</Button>,
    },
    {
      title: 'Detail',
      key: 'detail',
      render: (record) => <Button type="primary" onClick={()=> {
        openDetailModal(record)
      }}>See Detail</Button>,
    },
  ];

  const openAddModal = (record) => {
    setCurrentRecord(record)
    setAddModalOpen(true)
  };

  const openDetailModal = (record) => {
    setCurrentRecord(record);
    setDetailModalOpen(true);
  }

  const addCodeTobank = async () => {
    setLoading(true)
    if(currentRecord == null || code === ""){
      setLoading(false);
      return;
    }else {
      const {bankId} = currentRecord;
      try {
        const requestBody = {
          bankId,
          code
        };
        const url = API.ADD_CODE;
        const res = await axios.post(url, requestBody);
        if(res.status === 200){
          setLoading(false);
          setAddModalOpen(false);
          setCurrentRecord(null);
          setCode("")
          toast.success("add code succesfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        }else {
          setLoading(false);
          setAddModalOpen(false);
          setCurrentRecord(null);
          toast.error("failed to add code", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        }
      }catch(err){
        setLoading(false);
          setAddModalOpen(false);
          setCurrentRecord(null);
          toast.error("failed to add code", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
      }
    }
  }

  const deleteCode = async (code, bankId) => {
    if(code && bankId){
      try {
        const url = API.DELETE_CODE;
        const requestBody = {
          code,
          bankId
        }
        await axios.post(url, requestBody);
        const mostCurrent = bank.find(item => item.bankId === bankId);
        const newAvailable = mostCurrent.available.filter(item => item !== code);
        mostCurrent.available = newAvailable;
        setCurrentRecord(mostCurrent);
      }catch(err){
        console.log(err);
      }
    }
  }

  const historySource = useMemo(() => {
    let result = [];
    if(currentRecord){
      const {history} = currentRecord;
      history.forEach((item) => {
        const {code, time, type} = item;
        const obj = {
          code,
          type,
          time:moment(time).format("l"), 
        };
        result.push(obj)
      })
    }
    return result;
  }, [currentRecord])


  const history_columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title:"Type",
      dataIndex:"type",
      key:"type"
    },
    {
      title: "Time",
      dataIndex:"time",
      key: "time",
    },
  ]

  return <>
  <ToastContainer />
          <h2>Prize Bank</h2>
          <Table
              columns={bank_columns}
              dataSource={bank}
              rowKey="prize_option"
              scroll={{  y: 300 }}
              pagination={{
                pageSize:20
              }}
            />
        <Orders bank={bank} />
        <Modal title={`Add Code to ${currentRecord?.prize_name?? ""}`} visible={addModalOpen} 
        onCancel={()=> {
          setAddModalOpen(false);
          setCurrentRecord(null);
        }}
          footer={[
      <Button key="back" onClick={()=> {
        setAddModalOpen(false)
        setCurrentRecord(null);
      }}>
        Cancel
      </Button>
        ]}>
        <div style={{display:'flex', margin:'24px'}}>
        <Input placeholder="Enter the code" onChange={(e) => {
          setCode(e.target.value);
        }}
        value={code}
        style={{marginRight:12}}
        />
        <Button type="primary" onClick={debounceAddCode} disabled={loading}>{loading? "loading":"Add Code"}</Button>
        </div>
      </Modal>
      <Modal title={`${currentRecord?.prize_name?? ""} Prize Management`} visible={detailModalOpen} 
        onCancel={()=> {
          setDetailModalOpen(false);
          setCurrentRecord(null);
        }}
        style={{padding:'8px 16px'}}
        footer={[]}
        >
       <Tabs defaultActiveKey="1">
    <TabPane tab="Available Code" key="1">
      <TabDetail>
      <List
      bordered
      pagination={{
        pageSize:5
      }}
      size="small"
      dataSource={currentRecord?.available??[]}
      renderItem={item => (
        <List.Item>
          <div style={{display:'flex', justifyContent:'space-between', width:'100%', alignItems:'center'}}>
            <div>{item}</div>
            <Button onClick={() => {
              deleteCode(item, currentRecord?.bankId??"")
            }}>Delete Code</Button>
          </div>
        </List.Item>
      )}
    />
      </TabDetail>
    </TabPane>
    <TabPane tab="Bank History" key="2">
      <TabDetail>
      <Table
              columns={history_columns}
              dataSource={historySource}
              size="small"
              pagination={{
                pageSize:5
              }}
            />
      </TabDetail>
    </TabPane>
  </Tabs>
      </Modal>
  </>
}

const TabDetail = styled.div`
height:320px;
overflow-y:scroll;
`;

export default PrizeBank;


import React, { useEffect, useState, useMemo } from "react";
import { Table, Button, Modal, Input} from 'antd';
import Firebase from "../../util/firebase";
import styled from "styled-components";
import moment from "moment";
import { debounce } from "lodash";
import * as API from "../../util/api";
import axios from "axios";

const ExchangeOrders = () => {
  const [options, setOptions] = useState([]);
  const [exchangeHistory, setExchangeHistory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchExchangeOption = async() => {
      const snapshot = await Firebase.firestore()
      .collection("exchangeOptions")
      .get();

      let resultArray = [];
      snapshot.forEach((doc) => {
        const obj ={
          optionId:doc.id,
          ...doc.data()
        };
        resultArray.push(obj);
      });
      resultArray.sort((a, b) => {
        if(a.option < b.option){
          return -1;
        }else {
          return 1;
        }
      })
      setOptions(resultArray);
    };

    const fetchExchangeHistory = async() => {
      Firebase.firestore()
      .collection("exchange_order")
      .onSnapshot(function (querySnapshot) {
        let orders = [];
        querySnapshot.forEach(function (doc) {
          const order = {
            ...doc.data(),
            orderId: doc.id,
          };
          orders.push(order);
        });
        setExchangeHistory(orders)
      });
    }

    fetchExchangeOption();
    fetchExchangeHistory();
  },[]);

const pendingOrder = useMemo(() => {
  return exchangeHistory.filter(item => item.status === 0)
},[exchangeHistory]);

const fulfilledOrder = useMemo(() => {
  return exchangeHistory.filter(item => item.status === 1);
},[exchangeHistory]);

const debounceConfirm = debounce(() => {
  confirm();
},500)

const timeSortCreatedAt = (a,b) => {
  const timeA = moment(a.createdAt);
  const timeB = moment(b.createdAt);
  if(timeA.isBefore(timeB)){
    return -1;
  }else {
    return 1;
  }
}

const timeSortConfirmedAt = (a,b) => {
  const timeA = moment(a.confirmedAt);
  const timeB = moment(b.confirmedAt);
  if(timeA.isBefore(timeB)){
    return -1;
  }else {
    return 1;
  }
}



const confirm = async() => {
  if(current){
    const {orderId} = current;
    const requestBody = {
      confirmation,
      orderId,
    }
    const endpoint = API.CONFIRM_EXCHANGE_ORDER;
    try {
      const res = await axios.post(endpoint, requestBody);
      if(res.status === 200){
         setLoading(false);
         setConfirmation("");
         setCurrent(null);
         setModalOpen(false);
      }
    }catch(err){
      console.log(err);
    }
  }
}

const openModal = (record) => {
  setCurrent(record);
  setModalOpen(true);
}

const FulfilledColumn = [
  {
    title: "User",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title:"email",
    dataIndex:"email",
    key:"email"
  },
  {
    title: "Order At",
    render:(record) => {
      return moment(record.createdAt).format("l")
    },
    sorter:timeSortCreatedAt
  },
  {
    title:"value",
    dataIndex:'value',
    key:"value"
  },
  {
    title: "Confirmed At",
    render:(record) => {
      return moment(record.confirmedAt).format("l")
    },
    sorter:timeSortConfirmedAt
  },
  {
    title:"Reference",
    dataIndex:"reference",
    key:"reference"
  }
  
]

const pendingColum = [
  {
    title: "User",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title:"email",
    dataIndex:"email",
    key:"email"
  },
  {
    title: "Order At",
    render:(record) => {
      return moment(record.createdAt).format("l")
    },
    sorter:timeSortCreatedAt
  },
  {
    title:"value",
    dataIndex:'value',
    key:"value"
  },
  {
    title: 'Action',
    key: 'operation',
    render: (record) => <Button type="primary" onClick={()=> {
      openModal(record)
    }}>Confirm Transfer</Button>,
  },
]

return <Container>
  <h3>Pending Orders</h3>
 <Table
    columns={pendingColum}
    dataSource={pendingOrder}
  />
  <h3 style={{marginTop:24}}>Fulfilled Orders</h3>
  <Table
    columns={FulfilledColumn}
    dataSource={fulfilledOrder}
  />

  <Modal title={`Confirm Transfer`} visible={modalOpen} 
        onCancel={()=> {
          setModalOpen(false);
          setCurrent(null);
          setConfirmation("")
        }}
        style={{padding:'8px 16px'}}
        footer={[
          <Button key="back" onClick={()=> {
            setModalOpen(false);
            setCurrent(null);
            setConfirmation("")
          }}>
            Cancel
          </Button>
            ]}>
           <div style={{display:'flex', margin:'24px'}}>
        <Input placeholder="Enter the paypayl transfer reference " onChange={(e) => {
          setConfirmation(e.target.value);
        }}
        value={confirmation}
        style={{marginRight:12}}
        />
        <Button type="primary" onClick={() => {
          if(!loading){
            setLoading(true);
            debounceConfirm();
          }
        }} disabled={loading}>{loading? "loading":"Confirm"}</Button>
        </div>
        </Modal>
</Container>
}

const Container = styled.div`
width:100%;
min-height:600px;
overflow-y:scroll;
padding:0px 24px;
`;

export default ExchangeOrders;
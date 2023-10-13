import React, { useEffect, useState } from "react";
import Firebase from "../../util/firebase";
import { Table, Button } from "antd";
import moment from "moment";
import * as API from "../../util/api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { debounce } from "lodash";

import { Collapse } from 'antd';

const { Panel } = Collapse;

const Orders = ({bank}) => {
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [archived, setArchived] = useState([]);
  const [giveLoading, setGiveLoading] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const listener = Firebase.firestore()
    .collection("prize_redemption")
    .onSnapshot(function (snapshot){
      let result = [];
    snapshot.forEach((doc) => {
      const order = {
        ...doc.data(),
        orderId:doc.id
      };
      result.push(order);
    })
    const pending = result.filter(item => item.status === 0);
    const completed = result.filter(item => item.status === 1);
    const archived = result.filter(item => item.status === 3);
    setPending(pending);
    setCompleted(completed);
    setArchived(archived);
    });

    return () => {
      listener();
    }
    
  },[])

  const CheckAvailable = (record) => {
    const {prize_option} = record;
    const targetBank = bank.find(item => item.prize_option === prize_option);
    if(targetBank){
      const {available} = targetBank;
      if(available.length > 0){
        return true;
      }
    }
    return false;
  }

  const debounceGivePrize = debounce((record) => {
    givePrize(record)
  }, 500);

  const debounceArchiveOrder = debounce((record) => {
    archiveOrder(record)
  }, 500);

  const archiveOrder = async (record) => {
    setArchiveLoading(true);
    const {orderId} = record;
    setCurrentOrder(orderId);
    try {
      const requestBody = {
        orderId
      }
      const url = API.ARCHIVE_ORDER;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        toast.success("Archive order succesfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }else {
        toast.error("failed to archive order", {
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
      console.log(err)
      toast.error("failed to archive order", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }finally {
      setArchiveLoading(false);
      setCurrentOrder(null);
    }
  }


  const givePrize = async (record) => {
    setGiveLoading(true)
    const { prize_option, orderId} = record;
    setCurrentOrder(orderId);
    const targetBank = bank.find(item => item.prize_option === prize_option);
    if(targetBank){
      const {bankId} = targetBank;
      try {
        const requestBody = {
          bankId,
          orderId,
        }
        const url = API.GIVE_PRIZE;
        const res = await axios.post(url, requestBody);
        if(res.status === 200){
          toast.success("give prize succesfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        }else {
          toast.error("failed to give prize", {
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
        toast.error("failed to give prize", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      } finally {
        setGiveLoading(false);
        setCurrentOrder(null);
      }
    }else {
      setGiveLoading(false);
      setCurrentOrder(null);
      toast.error("system error", {
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

  const pending_column = [
    {
      title:"Prize Name",
      dataIndex:"prize_name",
      key:"prize_name"
    },
    {
      title:"Prize Option",
      dataIndex:"prize_option",
      key:"prize_option"
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email"
    },
    {
        title: "Requested At",
        key: "available",
        render: (record) => <span>{moment(record.createdAt).format('ll')}</span>,
        sorter: (a, b) =>
         {
           const time1= a.createdAt;
           const time2 = b.createdAt;
           if(moment(time1).isBefore(moment(time2))){
             return -1;
           }else {
             return 1;
           }
         }
    },
    {
      title: 'Confirm Prize',
      key: 'operation',
      render: (record) => (CheckAvailable(record) ? <Button type="primary" 
      onClick={() => debounceGivePrize(record)}
      disabled={giveLoading || currentOrder === record.orderId}
      >{(giveLoading && record.orderId) ?"loading":"Give Prize"}</Button>:<></>),
    },
    {
      title: 'Archive',
      key: 'operation',
      render: (record) => <Button type="primary" 
      onClick={() => debounceArchiveOrder(record)}
      disabled={archiveLoading || currentOrder === record.orderId}
      >{(archiveLoading && currentOrder === record.orderId )?"loading":"Archive"}</Button>,
    },
  ];

  const completed_column = [
    {
      title:"Prize Name",
      dataIndex:"prize_name",
      key:"prize_name"
    },
    {
      title:"Prize Option",
      dataIndex:"prize_option",
      key:"prize_option"
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email"
    },
    {
        title: "Created At",
        key: "createdAt",
        render: (record) => <span>{moment(record.createdAt).format('ll')}</span>,
        sorter: (a, b) =>
         {
           const time1= a.createdAt;
           const time2 = b.createdAt;
           if(moment(time1).isBefore(moment(time2))){
             return -1;
           }else {
             return 1;
           }
         }
    },
    {
      title: 'Completed At',
      key: 'deliveredAt',
      render: (record) => <span>{moment(record.deliveredAt).format('ll')}</span>,
      sorter: (a, b) =>
         {
           const time1= a.deliveredAt;
           const time2 = b.deliveredAt;
           if(moment(time1).isBefore(moment(time2))){
             return -1;
           }else {
             return 1;
           }
         }
    },
    {
      title: 'Code',
      key: 'code',
      dataIndex:"code",
    },
  ];


  const archive_column = [
    {
      title:"Prize Name",
      dataIndex:"prize_name",
      key:"prize_name"
    },
    {
      title:"Prize Option",
      dataIndex:"prize_option",
      key:"prize_option"
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email"
    },
    {
        title: "Created At",
        key: "createdAt",
        render: (record) => <span>{moment(record.createdAt).format('ll')}</span>,
        sorter: (a, b) =>
         {
           const time1= a.createdAt;
           const time2 = b.createdAt;
           if(moment(time1).isBefore(moment(time2))){
             return -1;
           }else {
             return 1;
           }
         }
    },
    {
      title: 'Archived At',
      key: 'archivedAt',
      render: (record) => <span>{moment(record.archivedAt).format('ll')}</span>,
      sorter: (a, b) =>
         {
           const time1= a.archivedAt;
           const time2 = b.archivedAt;
           if(moment(time1).isBefore(moment(time2))){
             return -1;
           }else {
             return 1;
           }
         }
    },
  ];



  return <>
   <ToastContainer />
   <Collapse defaultActiveKey={["1"]}>
      <Panel header="Pending Order" key="1">
        <Table
                    columns={pending_column}
                    dataSource={pending}
                    scroll={{  y: 500 }}
                    pagination={{
                      pageSize:20
                    }}
                  
        />
        </Panel>
        <Panel header="Completed Order" key="2">
        <Table
              columns={completed_column}
              dataSource={completed}
              scroll={{  y: 500 }}
              pagination={{
                pageSize:20
              }}
            
            />
          </Panel>
        <Panel header="Archived Order" key="3">
        <Table
              columns={archive_column}
              dataSource={archived}
              scroll={{  y: 500 }}
              pagination={{
                pageSize:20
              }}
            
            />
          </Panel>
    </Collapse>
  </>
}

export default Orders;
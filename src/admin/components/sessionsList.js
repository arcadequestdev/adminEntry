/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useMemo } from "react";
import {  Space, Table, Button, message} from 'antd';
import Firebase from "../../util/firebase";
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as API from "../../util/api";
import axios from "axios";
import SessionQuestModal from "./sessionQuestModal";

const SessionsList = ({influencers}) => {
  const { items: partners} = useSelector((state) => state.partners);
  const { items: products} =  useSelector((state) => state.products);
  const [modalOpen, setModalOpen] = useState(false);
  const [currSessionId, setCurrSessionId] = useState(null);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const listener  = Firebase.firestore().collection('brand_session')
      .where("campaignBased", "==", false)
      .onSnapshot(querySnapshot => {
        let result = []
        querySnapshot.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          sessionId: doc.id
        }
        result.push(obj);
      });
      setSessions(result)
    });
    return () => {
      listener();
    }
  },[]);

  const currentSession = useMemo(() => {
    return sessions.find(item => item.sessionId === currSessionId);
  }, [currSessionId, sessions])

  const updateSessionStatus = async (record, status) => {
    try {
      const sessionId = record.sessionId;
      const url = API.UPDATE_BRAND_SESSION_STATUS;
      const requestBody = {
        sessionId,
        status
      }
      const res = await axios.post(url, requestBody);
      if(res.status){
        message.success("You have updated the session status")
      }else {
        message.error("Failed to update status, please try again")
      }
    }catch(err){
      console.log(err);
      message.error("Failed to update status, please try again")
    }
  }

  

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Brand',
      dataIndex: 'partnerName',
      key: 'age',
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Quests',
      key: 'questsCount',
      dataIndex: 'questsCount',
    },
    {
      title:"Status",
      key:"status",
      render:(_, record) => {
        if(record.status === 0){
          return "Created"
        }else if(record.status === 1){
          return "Active"
        }else if(record.status === 2){
          return "Cancelled"
        }
      } 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return <Space size="middle">
        {
          record.status === 0 && <>
          <a onClick={() => {
            updateSessionStatus(record, 1);
          }}>Active</a>
          <a onClick={() => {
            updateSessionStatus(record, 2);
          }}>Cancel</a>
          <a onClick={() => {
            setCurrSessionId(record.sessionId);
            setModalOpen(true);
          }}>View Quests Detail</a>
          </>
        }
        {
          record.status === 1 && <>
          <Button disabled={true}>
            Active
          </Button>
           <a onClick={() => {
            updateSessionStatus(record, 2);
          }}>Cancel</a>
          <a onClick={() => {
            setCurrSessionId(record.sessionId);
            setModalOpen(true);
          }}>View Quests Detail</a>
          </>
        }
        {
          record.status === 2 && <Button disabled={true}>
            Cancel
          </Button>
        }
        </Space>
      }
        
      ,
    },
  ];


  const sessionData = useMemo(() => {
    const data = sessions.map((item) => {
      const {influencerId, partnerId, productId} = item;
      const influencerName = influencers.find(item => item.influencerId === influencerId)?.name??"";
      const partnerName = partners.find(item => item.partnerId === partnerId)?.name??"";
      const productName = products.find(item => item.productId === productId)?.name??"";
      const questsCount = item.questsList?.length??0;
      return {
        ...item,
        influencerName,
        partnerName,
        productName,
        questsCount
      }
    });
    return data;
  }, [sessions, influencers, partners, products])

  return <>
    <Table columns={columns} dataSource={sessionData} />
    {
      currentSession && <SessionQuestModal visible={modalOpen} handleCancel={() => {
        setModalOpen(false);
        setCurrSessionId(null);
      }} session={currentSession}/>
    }
  </>
}


export default SessionsList;
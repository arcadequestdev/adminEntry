import React, { useEffect, useState, useMemo } from "react";
import * as API from "../../util/api";
import axios from "axios";
import {  Table, Button, Modal, Input, Space, message} from 'antd';
import Firebase from "../../util/firebase";
import moment from "moment";

const SessionQuestModal = ({visible, handleCancel, session}) => {
  const [questId, setQuestId] = useState("");
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchQuests = async() => {
      let result = [];
      const questsList = session.questsList;
      for(let i=0; i< questsList.length; i++){
        const productRef = Firebase.firestore().collection("creator_quest").doc(questsList[i]);
        try {
          const doc = await productRef.get();
          const data = doc.data();
          const obj = {
            ...data,
            questId:doc.id
          }
          result.push(obj);
        }catch(err){
          console.log(err)
        }
      }
      setQuests(result);
    }
    fetchQuests()
  }, [session.questsList])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'questName',
      key: 'questName',
    },
    {
      title: 'Status',
      key: 'status',
      render:(record) => {
        if(record.status === 1){
          return 'Open'
        }else if(record.status === 2){
          return 'Ongoing'
        }else {
          return 'Ended'
        }
      }
    },
    {
      title: 'Start Time',
      key: 'startTime',
      render:(record) => {
        return moment(record.startTime).format("LLL")
      }
    },
    {
      title:"View",
      key:'questId',
      render:(record) => {
        const link = `https://play.arcadequest.app/creatorQuestCustomer/${record.questId}`;
        return <a  href={link} target="_blank" rel = "noopener noreferrer">View</a>
      }
    }
  ]

  const addQuest = async () => {
    if(questId !== ""){
      try {
        const requestBody = {
          questId,
          sessionId:session.sessionId
        }
        const url = API.BRAND_SESSION_ADD_QUEST;
        const res = await axios.post(url, requestBody);
        if(res.status === 200){
          setQuestId("");
          message.success("Quest is added to session")
        }else {
          message.error("Failed to add quest, please check quest id or try again")
        }
      }catch(err){
        message.error("Failed to add quest, please check quest id or try again")
      }
    }else {
      message.error("QuestId can not be empty")
    }
  }

  return <Modal  visible={visible} 
  title="Session Quests"
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      Return
    </Button>
  ]}>
    <Table columns={columns} dataSource={quests} />
    <div style={{display:'flex', justifyContent:'space-between', margin:'12px 0px'}}>
      <Input autoComplete="off" value={questId} onChange={(e) => {
          setQuestId(e.target.value)
      }} placeholder="Enter Quest Id"/>
      <Button style={{marginLeft:16}} type="primary" onClick={() => {
        addQuest()
      }}>
        Add New
      </Button>
    </div>
  </Modal>
}

export default SessionQuestModal;
import React,{useState, useMemo} from 'react';
import styled from 'styled-components';
import {  Modal, Button, Form, Input, message, Table } from 'antd';
import * as API from "../../util/api";
import axios from "axios";

const EditTeamModal = ({currentRecord, visible,  handleCancel, handleFinish}) => {
   const [teamInput, setTeamInput] = useState("");
   const currentSource = useMemo(() => {
    const members = currentRecord?.teamMembers?? [];
    const dataSource = [];
    members.forEach(item => {
      dataSource.push({
        email:item.email,
        key:item.userId,
        userId:item.userId,
        name:item.userName
      })
   })
   return dataSource;
   }
   , [currentRecord]);

   const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (item) => <Button type="primary" onClick={()=> {
        removeTeam(item.userId)
      }}>Remove</Button>,
    },
  ];

   const addNewMember = async () => {
    if(teamInput){
      const requestBody = {
        influencerId:currentRecord.influencerId,
        email:teamInput
      }
      const endPoint = API.ADD_INFLUENCER_TEAMMEMBER;
      try {
        const res = await axios.post(endPoint, requestBody);
      if(res.status === 200){
        setTeamInput("");
        message.success("Team Member Added Successfully")
      }else {
        message.error("Failed to Add Team Member, Please Try Again")
      }
      }catch(err){
        console.log(err);
        message.error("Failed to Add Team Member, Please Try Again")
      }
    }
   }


   const removeTeam = async (userId) => {
    const requestBody = {
      userId,
      influencerId:currentRecord.influencerId,
    }
    const endPoint = API.REMOVE_INFLUENCER_TEAMMEMBER;
    try {
      const res = await axios.post(endPoint, requestBody);
      if(res.status === 200){
        message.success("Remove Member Successfully")
      }else {
        message.error("Failed To Remove Member, Please Try Again")
      }
    }catch(err){
      message.error("Failed To Remove Member, Please Try Again")
    }
   }
   

   return <Modal  visible={visible} 
   title="Influencer Team Members"
   onCancel={handleCancel}
   footer={[
     <Button key="back" onClick={handleCancel}>
       Return
     </Button>
   ]}>
    <h4>Current Team</h4>
    <Table dataSource={currentSource} columns={columns} />
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <Input autoComplete="off" value={teamInput} onChange={(e) => {
          setTeamInput(e.target.value)
      }}/>
      <Button style={{marginLeft:16}} type="primary" onClick={() => {
        addNewMember()
      }}>
        Add New
      </Button>
    </div>

    </Modal>

}


export default EditTeamModal;
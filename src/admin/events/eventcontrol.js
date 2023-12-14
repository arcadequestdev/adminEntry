import React, {useState, useMemo} from 'react';
import { Descriptions, Collapse, Button, Modal, Input, message, Typography, Col, Divider, Row, Table} from 'antd';
import styled from "styled-components";
import moment from 'moment';
import ReactPlayer from "react-player";
import EventAddGameForm from './eventAddGameForm';
import * as API from "../../util/api";
import axios from "axios";
import EditEventModal from './editEventModal';

const { Title } = Typography;

const EventControl = ({viewAll, event, games}) => {
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const getStatusMap = (status) => {
    if(status === 0) return 'Pending'
    if(status === 1) return 'Live'
    if(status === 2) return 'Ended'
    if(status === -1)  return 'Cancelled'
  }

  const startEvent = async () => {
    try {
      const requestBody = {
        eventId:event.eventId
      }
      const url = API.START_EVENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Event is Started")
      }else {
        message.error("Failed to start event, please try again")
      }
    }catch(err){
      message.error("Failed to start event, please try again")
    }
  } 

  const cancelEvent = async () => {
    try {
      const requestBody = {
        eventId:event.eventId
      }
      const url = API.CANCEL_EVENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Event is Ended")
      }else {
        message.error("Failed to end event, please try again")
      }
    }catch(err){
      message.error("Failed to end event, please try again")
    }
  } 

  const endEvent = async () => {
    try {
      const requestBody = {
        eventId:event.eventId
      }
      const url = API.END_EVENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Event is Ended")
      }else {
        message.error("Failed to end event, please try again")
      }
    }catch(err){
      message.error("Failed to end event, please try again")
    }
  } 

  const selectPromoteGame = async (gameId) => {
    try {
      const requestBody = {
        eventId:event.eventId,
        gameId
      }
      const url = API.SELECT_EVENT_PROMOTE_GAME;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Game is selected as current promote game")
      }else {
        message.error("Failed to select game, please try again")
      }
    }catch(err){
      message.error("Failed to select game please try again")
    }
  }

  const removeGame = async (gameId) => {
    try {
      const requestBody = {
        gameId,
        eventId:event.eventId
      }
      const url = API.REMOVE_GAME_FROM_EVENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Game is removed, reserved codes are released")
      }else {
        message.error("Failed to remove game, please try again")
      }
    }catch(err){
      message.error("Failed to remove game, please try again")
    }
  }

  const clearPromoteGame = async () => {
    try {
      const requestBody = {
        eventId:event.eventId
      }
      const url = API.CLEAR_EVENT_PROMOTE_GAME;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("No Current Promote Game Now")
      }else {
        message.error("Failed to clear, please try again")
      }
    }catch(err){
      message.error("Failed to clear, please try again")
    }
  }

  const orderColumn = [
    {
      title: "Name",
      dataIndex: "gameName",
      key: "gameName",
    },
    {
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Time",
      key: "date",
      render:(record) => {
        return <span>
          {moment(record.date).format("lll")}
        </span>
      }
    },

  ]

  const gameColumn = [
    {
      title: "Name",
      dataIndex: "gameName",
      key: "gameName",
    },
    {
      title:'Price',
      key:'price',
      dataIndex:'price'
    },
    {
      title:'Total Copies',
      key:'copies',
      render:(record) => {
        return record?.copies??0
      }
    },
    {
      title:'Copies Left',
      key:'copies',
      render:(record) => {
        return record?.codes?.length??0
      }
    },
    {
      title:'',
      key:'operation',
      render:(record) => {
        if(event.status === 0){
          return <Button type="primary" onClick={() => {
            removeGame(record.gameId)
           }}>
             Remove
           </Button>
        }
        if(event.status === 1 && event?.currentPromoteGame !== record.gameId){
          return <Button type="primary" onClick={() => {
            selectPromoteGame(record.gameId)
           }}>
             Select
           </Button>
        }
      }
    }
  ]

  const currentGame = useMemo(() => {
    if(event.currentPromoteGame && event.status === 1){
      const {games} = event;
      const target = games.find(item => item.gameId === event.currentPromoteGame);
      return target?.gameName;
    }
    return null;
  }, [event])

  const updateEventData = async (values) => {
    try {
      const requestBody = {
        eventId:event.eventId,
        updatedData:values
      }
      const url = API.EDIT_EVENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Event is Updated")
        setEditModalOpen(false)
      }else {
        message.error("Failed to update event, please try again")
      }
    }catch(err){
      message.error("Failed to update event, please try again")
    }
  }

  return <>
  <Button onClick={viewAll}>
   Back To Events
  </Button>
  <Divider orientation="left">Event Detail</Divider>
  <div style={{margin:'24px 0px'}}>
    <div style={{display:'flex', width:'100%',  padding:12}}>
      <Title level={4}>{event.title}</Title>
      {
        event.status === 0 && <>
        <Button type="primary" style={{marginRight:16, marginLeft:"auto"}} onClick={() => {
          setEditModalOpen(true)
        }}>
          Edit
        </Button>
        <Button type="primary" style={{marginRight:16}}
        onClick={() => {
          cancelEvent()
        }}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={() => {
          startEvent()
        }}>
          Start
        </Button>
        </>
      }
      {
        event.status === 1 && <Button type="primary" style={{marginLeft:'auto'}} onClick={() => {
          endEvent()
        }}>
        End
      </Button>
      }
    </div>

    <Descriptions bordered 
    style={{background:'white'}}
        >
      <Descriptions.Item label="Start Time" span={1}>{moment(event?.startTime).format("L")}</Descriptions.Item>
      <Descriptions.Item label="Duration" span={1}>{parseInt(event?.duration)} HR</Descriptions.Item>
      <Descriptions.Item label="Status" span={1}>{getStatusMap(event.status)}</Descriptions.Item>
      <Descriptions.Item label="Register Users" span={1}>{event?.registerUsers?.length}</Descriptions.Item>
      <Descriptions.Item label="Promote Games" span={2}>{event?.games?.length}</Descriptions.Item>
      <Descriptions.Item label="Total Views" span={1}>{event?.totalViews??0}</Descriptions.Item>
      <Descriptions.Item label="Current Viewers" span={2}>{event?.currentViewers?.length??0}</Descriptions.Item>
      <Descriptions.Item label="Background" span={2}><img src={event.backgroundImage} alt="background" style={{width:200}}/></Descriptions.Item>
      <Descriptions.Item label="Promo Video" span={2}>{
        event.video && 
          <ReactPlayer
          url={event.video}
          playing={false}
          width="200px"
          height="200px"
          controls
        />
      }</Descriptions.Item>
      </Descriptions>
  </div>
  <Divider orientation="left">Games And Orders</Divider>
    <Row gutter={24}>
      <Col className="gutter-row" span={12}>
        <div style={{display:'flex', alignItems:'center', marginBottom:16}}>
          <Title level={4}>Promote Games</Title>
          {
            event.status === 0 && <Button style={{marginLeft:'auto'}} type="primary" onClick={() => {
              setOpen(true)
            }}>
            Add New Game
            </Button>
          }

        </div>
        {
          currentGame && <div style={{display:'flex', marginBottom:12}}>
            <Title level={5}>
            Current Promote Game: {currentGame}
          </Title>
          <Button type="primary" style={{marginLeft:'auto'}} onClick={() => {
            clearPromoteGame()
          }}>
          Clear
          </Button>
          </div> 
        }
        <Table
          columns={gameColumn}
          dataSource={event.games}
          />
      </Col>
      <Col className="gutter-row" span={12}>
        <Title level={4}>Orders</Title>
         <Table
          columns={orderColumn}
          dataSource={event.orders??[]}
          />
      </Col>
    </Row>
    <EventAddGameForm
    visible={open} 
    onCancel={() => {
      setOpen(false)
    }}
    games={games}
    event={event}
    />
    <EditEventModal 
    visible={editModalOpen}
    onCancel={() => {
      setEditModalOpen(false);
    }}
    initialValues={event? {
      ...event,
      startTime:moment(event.startTime)
    }:{}}
    updateEventData={updateEventData}
    />
  </>
}

export default EventControl;
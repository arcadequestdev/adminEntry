import React, {useState, useMemo} from 'react';
import { Descriptions, Collapse, Button, Modal, Input, message, Typography, Col, Divider, Row} from 'antd';
import styled from "styled-components";
import moment from 'moment';
import ReactPlayer from "react-player";
import EventAddGameForm from './eventAddGameForm';

const { Title } = Typography;

const EventControl = ({viewAll, event, games}) => {
  const [open, setOpen] = useState(false);

  const getStatusMap = (status) => {
    if(status === 0) return 'Pending'
    if(status === 1) return 'Live'
    if(status === 2) return 'Ended'
    if(status === -1)  return 'Cancelled'
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
        <Button type="primary" style={{marginRight:16, marginLeft:"auto"}} >
          Edit
        </Button>
        <Button type="primary" >
          Start
        </Button>
        </>
      }
      {
        event.status === 1 && <Button type="primary" >
        Edit
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
      <Descriptions.Item label="Background" span={2}><img src={event.backgroundImage} alt="background"/></Descriptions.Item>
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
        <div style={{display:'flex', alignItems:'center'}}>
          <Title level={4}>Promote Games</Title>
          <Button style={{marginLeft:'auto'}} type="primary" onClick={() => {
            setOpen(true)
          }}>
          Add New Game
          </Button>
        </div>
      </Col>
      <Col className="gutter-row" span={12}>
        <div >col-6</div>
      </Col>
    </Row>
    <EventAddGameForm
    visible={open} 
    onCancel={() => {
      setOpen(false)
    }}
    games={games}
    />
  </>
}

export default EventControl;
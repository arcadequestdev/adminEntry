import React, {useState, useMemo} from 'react';
import { Descriptions, Collapse, Button, Modal, Input, message } from 'antd';
import moment from 'moment'
import EventControl from "./eventcontrol";

const { Panel } = Collapse;

const EventList = ({events, games}) => {
  const [current, setCurrent] = useState(null);
  const [view, setView] = useState('all');

  const getStatusMap = (status) => {
    if(status === 0) return 'Pending'
    if(status === 1) return 'Live'
    if(status === 2) return 'Ended'
    if(status === -1)  return 'Cancelled'
  }
  const currentEvent = useMemo(() => {
    if(current){
      return events.find(item => item.eventId === current);
    }
    return null;
  }, [current, events]);
  return <>
  {
    view === 'all'  &&  <Collapse>
    {events.map(item => {return <Panel header={item.title} key={item.eventId} extra={<Button type="primary" onClick={() => {
      setCurrent(item.eventId);
      setView('detail')
    }}>Manage</Button>}>
      <Descriptions bordered labelStyle={{width:'10%'}}>
      <Descriptions.Item label="Start Time" span={1}>{moment(item?.startTime).format("L")}</Descriptions.Item>
      <Descriptions.Item label="Duration" span={1}>{parseInt(item?.duration)} HR</Descriptions.Item>
      <Descriptions.Item label="Status" span={1}>{getStatusMap(item.status)}</Descriptions.Item>
      <Descriptions.Item label="Register Users" span={1}>{item?.registerUsers?.length}</Descriptions.Item>
      <Descriptions.Item label="Promote Games" span={2}>{item?.games?.length}</Descriptions.Item>
      </Descriptions>
    </Panel>})}
    </Collapse>
  }
  {
    view === 'detail' && currentEvent && <EventControl event={currentEvent} viewAll={() => {
      setView("all");
      setCurrent(null)
    }}
    games={games}
    />
  }
  </>
}

export default EventList;
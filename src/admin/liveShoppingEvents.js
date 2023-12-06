import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import Firebase from "../util/firebase";
import styled from "styled-components";
import CreateLiveShoppingEventForm from "./events/createLiveShoppingEventForm";
import EventList from "./events/eventList";
const { TabPane } = Tabs;

const LiveShoppingEvents = ({partners, games}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const listener  = Firebase.firestore().collection('liveShoppingEvent')
      .onSnapshot(querySnapshot => {
        let result = []
        querySnapshot.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          eventId: doc.id
        }
        result.push(obj);
      });
      setEvents(result)
    });
    return () => {
      listener();
    }
  },[])
  return <Tabs defaultActiveKey="1" size="large">
  <TabPane tab="Create Events" key="1">
    <Container>
      <CreateLiveShoppingEventForm />
    </Container>
  </TabPane>
  <TabPane tab="Events List" key="2">
  <Container>
    <EventList events={events} games={games}/>
  </Container>
  </TabPane>
  </Tabs>
}

const Container = styled.div`
width:100%;
min-height:600px;
overflow-y:scroll;
padding:0px 24px;
`;

export default LiveShoppingEvents;
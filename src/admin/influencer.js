import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import Firebase from "../util/firebase";
import styled from "styled-components";
import CreateInfluencersForm from "./components/createInfluencerForm";
import InfluencerList from "./components/influencerList";

const { TabPane } = Tabs;

const Influencer = ({influencers}) => {
 /*  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    const listener  = Firebase.firestore().collection('influencer')
      .onSnapshot(querySnapshot => {
        let result = []
        querySnapshot.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          influencerId: doc.id
        }
        result.push(obj);
      });
      setInfluencers(result)
    });
    return () => {
      listener();
    }
  },[]) */

  const activeInfluencers = useMemo(() => {
    const result = (influencers??[]).filter(item => !item.archieved);
    return result;
  }, [influencers]);

  const archievedInfluencers = useMemo(() =>{
    const result = (influencers??[]).filter(item => item.archieved);
    return result;
  }, [influencers])

  return <Tabs defaultActiveKey="1" size="large">
  <TabPane tab="Add Influencers" key="1">
    <Container>
      <CreateInfluencersForm />
    </Container>
  </TabPane>
  <TabPane tab="Active Influencers" key="2">
  <Container>
    <InfluencerList influencers={activeInfluencers} active={true}/>
  </Container>
  </TabPane>
  <TabPane tab="Archieved Influencers" key="3">
  <Container>
    <InfluencerList influencers={archievedInfluencers} active={false}/>
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

export default Influencer;
import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import Firebase from "../util/firebase";
import styled from "styled-components";
import CreatePartnerForm from "./components/createPartnerForm";
import CreateGameForm from "./components/createGameForm";
import CreateGameByAppId from "./components/createGameByAppId";
import PartnersList from "./components/partnersList";
import CreateProductForm from "./components/createProductForm";
import AllGameList from "./components/allGameList";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;

const Partner = () => {

  const [partners, setPartners] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const listener  = Firebase.firestore().collection('partners')
      .onSnapshot(querySnapshot => {
        let result = []
        querySnapshot.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          partnerId: doc.id
        }
        result.push(obj);
      });
      setPartners(result)
    });
    return () => {
      listener();
    }
  },[]);

  useEffect(() => {
    const listener  = Firebase.firestore().collection('partnerGames')
      .onSnapshot(querySnapshot => {
        let result = []
        querySnapshot.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          gameId: doc.id
        }
        result.push(obj);
      });
      setGames(result)
    });
    return () => {
      listener();
    }
    
  }, [])


  return <Tabs defaultActiveKey="1" size="large">
  <TabPane tab="Partners" key="1">
    <Container>
      <PartnersList partners={partners} games={games}/>
    </Container>
  </TabPane>
  <TabPane tab="Create New Company" key="2">
  <Container>
  <CreatePartnerForm />
  </Container>
  </TabPane>
  <TabPane tab="Create New Product" key="3">
  <Container>
    <CreateProductForm partners={partners} />
  </Container>
  </TabPane>
  <TabPane tab="Create New Game" key="4">
  <Container>
    {/* <CreateGameForm partners={partners} /> */}
    <CreateGameByAppId partners={partners} />
  </Container>
  </TabPane>
  <TabPane tab="Current Games" key="5">
  <Container>
    <AllGameList games={games} />
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

export default React.memo(Partner);
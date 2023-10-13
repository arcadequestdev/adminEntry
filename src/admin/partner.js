import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import Firebase from "../util/firebase";
import styled from "styled-components";
import CreatePartnerForm from "./components/createPartnerForm";
import CreateGameForm from "./components/createGameForm";
import PartnersList from "./components/partnersList";
import CreateProductForm from "./components/createProductForm";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;

const Partner = () => {

  const [partners, setPartners] = useState([]);

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
  },[])


  return <Tabs defaultActiveKey="1" size="large">
  <TabPane tab="Partners" key="1">
    <Container>
      <PartnersList partners={partners}/>
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
    <CreateGameForm partners={partners} />
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
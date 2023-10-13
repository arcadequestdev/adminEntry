import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import styled from "styled-components";
import CreateSessionForm from "./components/createSessionForm";
import SessionsList from "./components/sessionsList";
const { TabPane } = Tabs;


const Session = ({influencers, partners}) => {
  return <Tabs defaultActiveKey="1" size="large">
  <TabPane tab="Create New Session" key="1">
    <Container>
    <CreateSessionForm influencers={influencers} partners={partners}/>
    </Container>
  </TabPane>
  <TabPane tab="Sessions" key="2">
  <Container>
    <SessionsList influencers={influencers}/>
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

export default Session;

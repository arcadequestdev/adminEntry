import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import styled from "styled-components";
import CreatePartnerForm from "./components/createPartnerForm";
import CreateGameByAppId from "./components/createGameByAppId";
import PartnersList from "./components/partnersList";
import CreateProductForm from "./components/createProductForm";
const { TabPane } = Tabs;

const Partner = ({partners, games}) => {


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
</Tabs>
}

const Container = styled.div`
width:100%;
min-height:600px;
overflow-y:scroll;
padding:0px 24px;
`;

export default React.memo(Partner);
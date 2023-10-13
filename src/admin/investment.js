import React from "react";
import { Tabs } from 'antd';
import styled from "styled-components";
import InvestmentForm from "./components/createInvestmentForm";
import InvestmentList from "./components/investmentList";


const { TabPane } = Tabs;

const Investment = ({streamers}) => {
  return  <Tabs defaultActiveKey="2" size="large">
  <TabPane tab="Create Investment" key="1">
    <Container>
    <InvestmentForm streamers={streamers}/>
    </Container>
    </TabPane>
    <TabPane tab="Manage Investment" key="2">
    <InvestmentList />
    </TabPane>
</Tabs>
}

const Container = styled.div`
width:100%;
min-height:600px;
overflow-y:scroll;
padding:0px 24px;
`;

export default Investment;
import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import styled from "styled-components";
import AllGameList from "./allGameList";
import OrderList from "./orderList";
import { useSelector } from "react-redux";
import Firebase from "../../util/firebase";
import CreateVotingGame from "./components/createVotingGame";
const { TabPane } = Tabs;

const GameAndOrders = ({partners, games}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const listener  = Firebase.firestore().collection('liveShoppingOrder').
    where('status', "==", 1)
    .onSnapshot(querySnapshot => {
      let result = []
      querySnapshot.docs.forEach(doc => {
      const obj = {
        ...doc.data(),
        orderId: doc.id
      }
      result.push(obj);
    });
    setOrders(result)
  });
  return () => {
    listener();
  }
  }, [])
  return <Tabs defaultActiveKey="1" size="large">
  <TabPane tab="Current Games" key="1">
  <Container>
    <AllGameList games={games} orders={orders}/>
  </Container>
  </TabPane>
  <TabPane tab="Game Orders" key="2">
  <Container>
    <OrderList orders={orders} />
  </Container>
  </TabPane>
  <TabPane tab="Game Voting" key="3">
  <Container>
    <CreateVotingGame />
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

export default GameAndOrders;
import React, { useEffect, useState, useMemo } from "react";
import { Tabs } from 'antd';
import Firebase from "../util/firebase";
import styled from "styled-components";
import CreateForm from "./components/createPrizeForm";
import PrizeGallery from "./components/prizeGallery";
const { TabPane } = Tabs;

const DigitalPrize = ({streamers}) => {
  const [prizes, setPrizes] = useState([]);

  useEffect(() => {
    const fetchPrize = async () => {
      let result = []
      await Firebase.firestore().collection('digitalPrize').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          prizeId: doc.id
        }
        result.push(obj);
      });
      setPrizes(result)
    });
    }
    fetchPrize();
  },[])


  return <Tabs defaultActiveKey="1" size="large">
  <TabPane tab="Prizes Gallery" key="1">
    <Container>
      <PrizeGallery prizes={prizes}/>
    </Container>
  </TabPane>
  <TabPane tab="Create New Prize" key="2">
  <Container>
    <CreateForm streamers={streamers}/>
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

export default React.memo(DigitalPrize);

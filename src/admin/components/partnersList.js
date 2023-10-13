import React, {useState, useMemo} from 'react';
import { Descriptions, Collapse, Button, Modal, Input, message, Typography } from 'antd';
import ProductList from "./productList.js"
import GameList from "./gameList.js"
import styled from 'styled-components';
import EditPartnerModal from './editPartnerModal.js';
import EditBrandTeamModal from './editBrandTeamModal.js';


const { Panel } = Collapse;
const { Title } = Typography;

const PartnersList = ({partners}) => {
  const [current, setCurrent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  const currentRecord  = useMemo(() => {
    return partners.find((item) => item.partnerId === current)
  }, [partners, current])

  const brandPartners = useMemo(() => {
    return partners.filter(item => item.type === 'brand');
  }, [partners]);

  const gamePublisher = useMemo(() => {
    return partners.filter(item => item.type === 'game_publisher');
  }, [partners]);


  return <>
  <Title level={3}>Brand Partners</Title>
  <Collapse>
  {brandPartners.map((item) => {return <Panel header={item.name} key={item.partnerId}>
    <h3>Basic</h3>
    <Descriptions bordered labelStyle={{width:'10%'}}>
    <Descriptions.Item label="Name" span={3}>{item.name}</Descriptions.Item>
    <Descriptions.Item label="Link" span={3}>
      {item.link}
    </Descriptions.Item>
    <Descriptions.Item label="Info" span={3}>
    {item.info}
    </Descriptions.Item>
  </Descriptions>
  <ButtonContainer>
  <Button type="primary" 
    onClick={() => {
      setCurrent(item.partnerId)
      setEditModalOpen(true);
  }} >
    Edit Profile
  </Button>
  <Button type="primary" style={{marginLeft:16}}
    onClick={() => {
      setCurrent(item.partnerId)
      setTeamModalOpen(true);
  }} >
    Edit Team Member
  </Button>
  </ButtonContainer>
  <h3 style={{marginTop:12}}>Products</h3>
  <ProductList partnerId={item.partnerId} products={item.products}/>
  </Panel>
  })}
  </Collapse>
  {
    current && editModalOpen && <EditPartnerModal
    visible={editModalOpen}
    currentRecord={currentRecord}
    handleCancel={() => {
      setCurrent(null)
      setEditModalOpen(false);
    }}
    handleFinish={() => {
      setCurrent(null)
      setEditModalOpen(false);
    }} />
  }
  {
    current && teamModalOpen && <EditBrandTeamModal
    visible={teamModalOpen}
    currentRecord={currentRecord}
    handleCancel={() => {
      setCurrent(null)
      setTeamModalOpen(false);
    }}
    handleFinish={() => {
      setCurrent(null)
      setTeamModalOpen(false);
    }} />
  }
  <Title level={3} style={{margin:"24px 0px"}}>Game Publisher</Title>
  <Collapse>
  {gamePublisher.map((item) => {return <Panel header={item.name} key={item.partnerId}>
    <h3>Basic</h3>
    <Descriptions bordered labelStyle={{width:'10%'}}>
    <Descriptions.Item label="Name" span={3}>{item.name}</Descriptions.Item>
    <Descriptions.Item label="Link" span={3}>
      {item.link}
    </Descriptions.Item>
    <Descriptions.Item label="Info" span={3}>
    {item.info}
    </Descriptions.Item>
  </Descriptions>
  <ButtonContainer>
  <Button type="primary" 
    onClick={() => {
      setCurrent(item.partnerId)
      setEditModalOpen(true);
  }} >
    Edit Profile
  </Button>
  <Button type="primary" style={{marginLeft:16}}
    onClick={() => {
      setCurrent(item.partnerId)
      setTeamModalOpen(true);
  }} >
    Edit Team Member
  </Button>
  </ButtonContainer>
  <h3 style={{marginTop:12}}>Games</h3>
  <GameList partnerId={item.partnerId} games={item.games}/>
  </Panel>
  })}
  </Collapse>
  </>
}

const ButtonContainer = styled.div`
margin-top:24px;
display:flex;
`;

export default PartnersList;
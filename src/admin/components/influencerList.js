import React, {useState, useMemo} from 'react';
import { Descriptions, Collapse, Button, Modal, Input, message } from 'antd';
import styled from "styled-components";
import * as API from "../../util/api";
import axios from "axios";
import EditInfluencerModal from "./editInfluencerModal";
import EditTeamModal from './editTeamModal';
import { SearchOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const InfluencerList = ({influencers, active}) => {
  const [current, setCurrent] = useState(null);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("")

  const handleCancel = () => {
    setLinkModalOpen(false);
    setCurrent(null);
  };

  const currentRecord  = useMemo(() => {
    return influencers.find((item) => item.influencerId === current)
  }, [influencers, current])


  const handleConfirmLink = async () => {
    try {
      const requestBody = {
        influencerId:current,
        email:input
      }
      const endPoint = API.INFLUENCER_LINK_ACCOUNT;
      const res = await axios.post(endPoint, requestBody);
      if(res.status === 200){
        message.success("Account Linked");
        setLinkModalOpen(false);
        setCurrent(null)
        setInput("")
      }
    }catch(err){
        message.error("Failed to link account");
        setLinkModalOpen(false);
        setCurrent(null)
    }
  }

  const archieveInfluencer = async (influencerId) => {
    try {
      const requestBody = {
        influencerId:current,
      }
      const url = API.ARCHIEVE_INFLUENCER;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("This influencer is archieved, all permission is removed")
      }else {
        message.error("Failed to archieve influencer, please try again")
      }
    }catch(err){
      message.error("Failed to archieve influencer, please try again")
    }

  }

  const showList = useMemo(() => {
    const result = influencers.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));
    return result;
  }, [searchInput, influencers])



  return <>
  <Input size="large" placeholder="Search Influencers" prefix={<SearchOutlined />} 
  value={searchInput} onChange={(e) => {
    setSearchInput(e.target.value)
  }}
  allowClear={true}
  style={{width:300, marginBottom:24}}
  />
  <Collapse>
   {showList.map((item) => {return <Panel header={item.name} key={item.influencerId}>
    <Descriptions bordered labelStyle={{width:'10%'}}>
    <Descriptions.Item label="Name" span={1}>{item.name}</Descriptions.Item>
    <Descriptions.Item label="Logo" span={2}>
      {
        item.profile_image_url? <img src={item.profile_image_url??""} style={{width:50}} alt="logo"/> : "-"
      }
    </Descriptions.Item>
    <Descriptions.Item label="Followers" span={1}>{item.metricsData?.followers?? "-"}</Descriptions.Item>
    <Descriptions.Item label="averageViewers" span={1}>
      {item.metricsData?.avg_viewers??"-"}
    </Descriptions.Item>
    <Descriptions.Item label="peakViewers" span={1}>
      {item.metricsData?.max_viewers?? "-"}
    </Descriptions.Item>
    <Descriptions.Item label="Price Per Post" span={1}>${item.pricePerPost?? "-"}</Descriptions.Item>
    <Descriptions.Item label="Price Per Quest" span={2}>
      ${item.pricePerQuest?? "-"}
    </Descriptions.Item>
    <Descriptions.Item label="Twitch" span={1}>{item.twitchUrl?? "-"}</Descriptions.Item>
    <Descriptions.Item label="Twitter" span={2}>
      {item.twitter?? "-"}
    </Descriptions.Item>
    <Descriptions.Item label="Location" span={1}>{item.location?? "-"}</Descriptions.Item>
    <Descriptions.Item label="Language" span={1}>
      {item.language?? "-"}
    </Descriptions.Item>
    <Descriptions.Item label="Email" span={1}>
      {item.contactEmail?? "-"}
    </Descriptions.Item>
    <Descriptions.Item label="Linked" span={1}>
      {item.accountLinked? "Yes":"No"}
    </Descriptions.Item>
    <Descriptions.Item label="Linked Account" span={2}>
      {item.linkedAccountEmail?? "-"}
    </Descriptions.Item>
  </Descriptions>
  {
    active  &&  <ButtonContainer>
    {
      !item.accountLinked &&  <Button type="primary" onClick={() => {
        setLinkModalOpen(true)
        setCurrent(item.influencerId)
      }}>
        Link Account
      </Button>
    }
    <Button type="primary" style={{marginLeft:16}}
      onClick={() => {
        setCurrent(item.influencerId)
        setEditModalOpen(true);
    }} >
      Edit Profile
    </Button>
    <Button type="primary" style={{marginLeft:16}}
      onClick={() => {
        setCurrent(item.influencerId)
        setTeamModalOpen(true);
    }} >
      Edit Team Member
    </Button>
    <Button type="primary" style={{marginLeft:16}}
    onClick={() => {
      archieveInfluencer(item.influencerId)
    }}
    >
      Archieve Influencer
    </Button>
    </ButtonContainer>
  }
  </Panel>
  })}
  </Collapse>
  {
    current && <Modal visible={linkModalOpen} 
      handleCancel={handleCancel}
        title="Link Account"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirmLink}>
          Submit
        </Button>
        ]}>
        <Input autoComplete="off" value={input} onChange={(e) => {
          setInput(e.target.value)
        }}/>
    </Modal>
  }
  {
    currentRecord && editModalOpen && <EditInfluencerModal 
    visible={editModalOpen}
    currentRecord={currentRecord}
    handleCancel={() => {
      setCurrent(null)
      setEditModalOpen(false);
    }}
    handleFinish={() => {
      setCurrent(null)
      setEditModalOpen(false);
    }}
    />
  }
  {
    currentRecord && teamModalOpen && <EditTeamModal 
    visible={teamModalOpen}
    currentRecord={currentRecord}
    handleCancel={() => {
      setCurrent(null)
      setTeamModalOpen(false);
    }}
    handleFinish={() => {
      setCurrent(null)
      setEditModalOpen(false);
    }}
    />
  }
  </>
}

const ButtonContainer = styled.div`
margin-top:24px;
`;

export default InfluencerList;
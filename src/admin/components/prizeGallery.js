import React from 'react';
import moment from 'moment';
import { Descriptions, Collapse } from 'antd';
import ReactPlayer from "react-player";


const { Panel } = Collapse;

const PrizeGallery = ({prizes}) => {
  return <Collapse>
  {prizes.map((item) => {return <Panel header={item.name} ><Descriptions bordered>
    <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
    <Descriptions.Item label="Quantity Available">{item.quantity}</Descriptions.Item>
    <Descriptions.Item label="Price in Coins">{item.coins}</Descriptions.Item>
    <Descriptions.Item label="Created On">{moment(item.createdAt).format("l")}</Descriptions.Item>
    <Descriptions.Item label="Sold">{item.userRedeemed.length}</Descriptions.Item>
{
  item.streamerName && <Descriptions.Item label="Related Streamer" span={2}>{item.streamerName}</Descriptions.Item>
}
    <Descriptions.Item label="Description" span={3}>
      {item.description}
    </Descriptions.Item>
    <Descriptions.Item label="Cover Image">
      <img src={item.coverUrl} style={{width:50}} alt="coverUrl"/>
    </Descriptions.Item>
    {
      item.streamerAvatar && <Descriptions.Item label="Streamer Avatar">
      <img src={item.streamerAvatar} style={{width:50}} alt="coverUrl"/>
    </Descriptions.Item>
    }
    <Descriptions.Item label="Video" span={3}>
    <ReactPlayer
              url={item.videoUrl}
              playing={false}
              width="200px"
              height="200px"
              controls
            />
    </Descriptions.Item>
  </Descriptions>
  </Panel>
  })}
  </Collapse>
}

export default PrizeGallery;
import React, {useEffect, useState, useMemo} from 'react';
import axios from 'axios';
import * as API from "../../util/api";
import { Table, Button, message, Descriptions, Collapse, Divider, Col, Row, Typography, List} from 'antd';
import SetPriceModal from './components/setPriceModal';
import AddGameKeysModal from './components/addGameKeysModal';
import ReactPlayer from "react-player";
import moment from 'moment'
import UploadVideoModal from './components/uploadVideoModal';
const { Title } = Typography;
const { Panel } = Collapse;

const GameDetail = ({currentRecord, backToAll, currentRecordOrders}) => {
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [keysModalOpen, setKeysModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleDelete = async (item) => {
    try {
      const requestBody = {
        gameId:currentRecord.gameId,
        code:item
      }
      const url = API.DELETE_GAME_SALE_CODE;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Successfully delete the code")
      }else {
        message.error("Failed to delete code")
      }
    }catch(err){
      console.log(err)
      message.error("Failed to delete code")
    }
  }

  const orderColumns = [
  {
    title:"Sale At",
    dataIndex:'price',
    key:'price'
  },
  {
    title:"Code",
    dataIndex:'code',
    key:'code'
  },
  {
    title:"Order From",
    dataIndex:'from',
    key:'from'
  },
  {
    title:'Order Date',
    key:'createdAt',
    render:(record) => {
      return <span>
        {moment(record.createdAt).format("LLL")}
      </span>
    }
  }
]

const transColumns = [
  {
    title:"Date",
    key:'price',
    render:(record) => {
      return <span>
        {moment(record.date).format("lll")}
      </span>
    }
  },
  {
    title:"Copies",
    key:'code',
    render:(record) => {
      return <span>
        {record.codes?.length??0}
      </span>
    }
  },
  {
    title:'Event',
    dataIndex:'eventName',
    key:'eventName'
  },
  {
    title:'Type',
    dataIndex:'type',
    key:'type'
  }
]

  return <>
<Button onClick={backToAll}>
  Back
</Button>
<Divider />
<Collapse>
<Panel header={`${currentRecord.name} Detail`} key={currentRecord.productId}>
      <Descriptions bordered labelStyle={{width:'10%'}}>
      <Descriptions.Item label="Name" span={3}>{currentRecord.name}</Descriptions.Item>
      <Descriptions.Item label="Link" span={3}>
        {currentRecord.steam_link}
      </Descriptions.Item>
      <Descriptions.Item label="Short Description" span={3}>
      {currentRecord.short_description}
      </Descriptions.Item>
      <Descriptions.Item label="Long Description" span={3}>
      {currentRecord.long_description}
      </Descriptions.Item>
      <Descriptions.Item label="Banner Image" span={2}>
      <img src={currentRecord.bannerUrl} style={{width:100}} alt="bannerUrl" />
    </Descriptions.Item>
    <Descriptions.Item label="Regular Price" span={2}>
      {currentRecord.regular_price}
    </Descriptions.Item>
    <Descriptions.Item label="Product Image" span={3}>
      {
        (currentRecord.productImages??[]).map((image) => {
          return <img src={image} style={{width:100, marginRight:24}} alt="product"/>
        })
      }

    </Descriptions.Item>
    <Descriptions.Item label="Video" span={3}>
    <ReactPlayer
              url={currentRecord.video}
              playing={false}
              width="200px"
              height="200px"
              controls
            />
    </Descriptions.Item>
    </Descriptions>
    </Panel>
</Collapse>
<Divider />
    <div style={{display:'flex'}}>
        <Button type="primary" onClick={() => {
          setPriceModalOpen(true)
        }}
        style={{marginRight:16}}
        >
          Set All Day Sale Price
        </Button>
        <Button type="primary" onClick={() => {
          setVideoModalOpen(true)
        }}>
          Manage Ad Videos
        </Button>
        </div>
<Divider />
<Row gutter={[16, 16]}>
  <Col span={12}>
    <div style={{display:'flex', justifyContent:'space-between', marginBottom:12}}>
      <Title level={5}>
        Codes For Sale
      </Title>
      <Button type="primary" onClick={() => {
        setKeysModalOpen(true)
      }}>
        Add More
      </Button>
    </div>
    <List
        size="large"
        pagination={{
          pageSize: 5,
        }}
        bordered
        dataSource={currentRecord.codesForSale}
        renderItem={(item, index) => (
          <List.Item
          style={{borderBottom:'1px solid #d9d9d9'}}
            actions={[
              <Button
                type="danger"
                onClick={() => {
                  handleDelete(item)
                }}
              >
                Delete
              </Button>
            ]}
          >
            {item}
          </List.Item>
        )}
      />
  </Col>
  <Col span={12}>
    <Title level={5}>
      Codes For Redeem(Influencer)
    </Title>
    <List
        size="large"
        pagination={{
          pageSize: 5,
        }}
        bordered
        dataSource={currentRecord.availableCodes}
        renderItem={(item, index) => (
          <List.Item
          style={{borderBottom:'1px solid #d9d9d9'}}
            actions={[
              <Button
                type="danger"
              >
                Delete
              </Button>
            ]}
          >
            {item}
          </List.Item>
        )}
      />
  </Col>
</Row>
<Divider />
<Row gutter={[16, 16]}>
  <Col span={16}>
  <Title level={5}>
      Orders
    </Title>
    <Table columns={orderColumns} dataSource={currentRecordOrders} />
  </Col>
  <Col span={8}>
  <Title level={5}>
      Codes Transaction
    </Title>
    <Table columns={transColumns} dataSource={currentRecord.codesReservedHistory??[]} />
  </Col>
</Row>

{
    currentRecord && <SetPriceModal
    currentRecord={currentRecord}
    visible={priceModalOpen}
    handleCancel={() => {
      setPriceModalOpen(false)
    }}
    handleFinish={() => {
      setPriceModalOpen(false);
    }}
/>
  }
  {
    currentRecord && <UploadVideoModal
    currentRecord={currentRecord}
    visible={videoModalOpen}
    handleCancel={() => {
      setVideoModalOpen(false)
    }}
    handleFinish={() => {
      setVideoModalOpen(false);
    }}
/>
  }
  {
    currentRecord && <AddGameKeysModal 
    currentRecord={currentRecord}
    visible={keysModalOpen}
    handleCancel={() => {
      setKeysModalOpen(false)
    }}
    handleFinish={() => {
      setKeysModalOpen(false);
    }}
    />
  }
  </>

}

export default GameDetail;
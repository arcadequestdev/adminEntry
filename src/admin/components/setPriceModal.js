import React, {useState, useEffect} from 'react';
import {  Modal, Button, Input, message } from 'antd';
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as API from "../../util/api";
import axios from "axios";


const SetPriceModal = ({currentRecord, visible,  handleCancel, handleFinish}) => {
  const [price, setPrice] = useState("")

  useEffect(() => {
    if(currentRecord && currentRecord.promote_price){
      setPrice(currentRecord.promote_price)
    }else {
      setPrice("")
    }
  },[visible, currentRecord]);

  const confirmPrice = async() => {
    try {
      const requestBody = {
        gameId:currentRecord.gameId,
        promote_price:price
      }
      const url = API.SET_GAME_PROMOTE_PRICE;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Promote Price is set for this game");
        handleFinish()
      }else {
        message.error("Failed to set price, please try agin")
      }
    }catch(err){
      message.error("Failed to set price, please try agin")
    }
  }
  const title = `Set Price For ${currentRecord?.name}`
  return <Modal  visible={visible} 
  title={title}
  onCancel={handleCancel}
  footer={[
    <Button type="primary" onClick={() => {
      confirmPrice()
    }}>
      Confirm
    </Button>,
    <Button key="back" onClick={handleCancel}>
      Return
    </Button>
  ]}>
  <h3>
    Current Promote Price: {currentRecord.promote_price?? "Not Set"} $USD
  </h3>
  <Input value={price} onChange={(e) => {
    setPrice(e.target.value)
  }} /> in $USD
  </Modal>
}

export default SetPriceModal;

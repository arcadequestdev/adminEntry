import React, {useState, useEffect} from 'react';
import {  Modal, Button, Input, message } from 'antd';
import * as API from "../../util/api";
import axios from "axios";


const SetPriceModal = ({currentRecord, visible,  handleCancel, handleFinish}) => {
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("")

  useEffect(() => {
    if(currentRecord && currentRecord.promote_price){
      setPrice(currentRecord.promote_price);
      setOriginalPrice(currentRecord.original_price)
    }else {
      setPrice("");
      setOriginalPrice("")
    }
  },[visible, currentRecord]);

  const confirmPrice = async() => {
    try {
      const requestBody = {
        gameId:currentRecord.gameId,
        promote_price:price,
        original_price:originalPrice
      }
      const url = API.SET_GAME_PRICE;
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
    Original Price: {currentRecord.original_price?? 'Not Set'} $USD
  </h3>
  <h3>
    Current Promote Price: {currentRecord.promote_price?? "Not Set"} $USD
  </h3>
  <div style={{display:'flex', alignItems:'center',  marginBottom:16}}>
    <span style={{display:'inline-block'}}>
    Original Price: 
    </span>
  <Input value={originalPrice} onChange={(e) => {
    setOriginalPrice(e.target.value)
  }} /> $USD
  </div>
  <div style={{display:'flex', alignItems:'center'}}>
    <span style={{display:'inline-block'}}>
    Promote Price: 
    </span>
  <Input value={price} onChange={(e) => {
    setPrice(e.target.value)
  }} /> $USD
  </div>
  </Modal>
}

export default SetPriceModal;

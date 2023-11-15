import React, {useState, useEffect} from 'react';
import {  Modal, Button, Input, message, List } from 'antd';
import * as API from "../../util/api";
import axios from "axios";
const { TextArea } = Input;

const AddGameKeysModal = ({currentRecord, visible,  handleCancel, handleFinish}) => {
  const [keys, setKeys] = useState([]);
  const [input, setInput] = useState("");

  const title = `Manage Keys For ${currentRecord?.name}`;

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

  const addNewKeys = async () => {
    const newKeys = input.split('\n');
    try {
      const requestBody = {
        gameId:currentRecord.gameId,
        codeArray:newKeys
      } 
      const url = API.ADD_SALE_GAME_CODE_ARRAY;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Code added")
        setInput("")
      }else {
        message.error("Failed to add codes")
      }
    }catch(err){
      message.error("Failed to add codes")
    }
  }

  return <Modal  visible={visible} 
  title={title}
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      Return
    </Button>
  ]}>
    <h3>
      Available Keys
    </h3>
    <List
        size="large"
        pagination={{
          pageSize: 5,
        }}
        dataSource={currentRecord.codesForSale}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="danger"
                onClick={() => handleDelete(item)}
              >
                Delete
              </Button>
            ]}
          >
            {item}
          </List.Item>
        )}
      />
      <TextArea rows={4} value={input} onChange={(e) => {
        setInput(e.target.value)
      }} style={{marginTop:16}}/>  
      <Button type="primary" onClick={() => {
        addNewKeys()
      }} style={{marginTop:16}}>
        Add New Keys
      </Button>
  </Modal>

}

export default AddGameKeysModal;
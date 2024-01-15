import React, {useState, useEffect} from 'react';
import {  Modal, Button, Input, message, Upload, List } from 'antd';
import * as API from "../../../util/api";
import firebase from "firebase/app";
import Firebase from "../../../util/firebase";
import axios from "axios";
import { UploadOutlined } from '@ant-design/icons';
import ReactPlayer from "react-player";

const UploadVideoModal = ({currentRecord, visible,  handleCancel, handleFinish}) => {
  const [videoInput, setVideoInput] = useState("");

  const addToGame = async () => {
    if(videoInput){
      try {
        const requestBody = {
          gameId:currentRecord.gameId,
          url:videoInput
        }
        const url = API.GAME_ADD_AD_VIDEO;
        const res = await axios.post(url, requestBody);
        if(res.status === 200){
          setVideoInput("");
          message.success("Video is added to game")
        }else {
          message.error("Failed to upload video, please try again")
        }
      }catch(err){
        message.error("Failed to upload video, please try again")
      }
    }
  }

  const deleteVideo = async (item) => {
    try {
      const requestBody = {
        gameId:currentRecord.gameId,
        videoId:item.videoId
      }
      const url = API.GAME_DELETE_AD_VIDEO;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Video is deleted")
      }else {
        message.error("Failed to delete video, please try again")
      }
    }catch(err){
      message.error("Failed to delete video, please try again")
    }
  }

  const handleChange = async (info) => {
    if (info.file.status === "done") {
      console.log("done");
    }
    if (info.file.status === "error") {
      console.log("upload error");
    }
  };

  const customRequestVideo = async ({ onError, onSuccess, file }) => {
    const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    const fileName = file.name.replace(pattern, "");
    const uploadTask = Firebase.storage()
      .ref()
      .child("productVideo/" + fileName)
      .put(file);
    try {
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setVideoInput(downloadURL)
          });
        }
      );
      onSuccess(() => console.log("success"));
    } catch (err) {
      onError(err);
      console.log(err);
    }
  };

  return <Modal  visible={visible} 
  title="Ad Videos"
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      Return
    </Button>
  ]}>
  <List
        size="large"
        pagination={{
          pageSize: 3,
        }}
        bordered
        dataSource={currentRecord.adVideos??[]}
        renderItem={(item, index) => (
          <List.Item
          style={{borderBottom:'1px solid #d9d9d9'}}
            actions={[
              <Button
                type="danger"
                onClick={() => {
                  deleteVideo(item)
                }}
              >
                Delete
              </Button>
            ]}
          >
            <ReactPlayer
              url={item.url}
              playing={false}
              width="200px"
              height='200px'
              controls
            />
          </List.Item>
        )}
      />
  <div style={{display:'flex', alignItems:'center',  marginBottom:16, marginTop:16}}>
    <span style={{display:'inline-block', marginRight:8}}>
   Url:
    </span>
  <Input value={videoInput} onChange={(e) => {
    setVideoInput(e.target.value)
  }} />
  <Button type="primary" style={{marginLeft:12}} onClick={() => {
    addToGame()
  }}>
    Add 
  </Button>
  </div>
  <Upload 
        onChange={handleChange}
        accept="video/*"
        customRequest={customRequestVideo}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>
  </Modal>
}

export default UploadVideoModal;

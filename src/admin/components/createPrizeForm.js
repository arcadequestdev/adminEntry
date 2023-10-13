import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  message 
} from 'antd';
import React from 'react';
import firebase from "firebase/app";
import Firebase from "../../util/firebase";
import * as API from "../../util/api";
import axios from "axios";

const { TextArea } = Input;

const { Option } = Select;


const CreateForm = ({streamers}) => {

  const [form] = Form.useForm();


  const onFinish = async (values) => {
    let communityId = "";
    let streamerName = "";
    let requestBody = {
      ...values
    }
    if(values.streamerId) {
      const targetStreamer = values.streamerId;
      const streamerInfo = streamers.find(item => item.userId === targetStreamer);
      communityId = streamerInfo?.communityId??"";
      streamerName = streamerInfo?.first_name??"";
      requestBody.communityId = communityId;
      requestBody.streamerName = streamerName;
    }
    try {
      const url = API.CREATE_DIGITAL_PRIZE;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.info('Digital Prize Created Successfully');
        form.resetFields();

      }
    }catch(err){
      console.log(err);
    }
  };

  const customRequestCoverUrl = async ({ onError, onSuccess, file }) => {
    const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    const fileName = file.name.replace(pattern, "");
    const uploadTask = Firebase.storage()
      .ref()
      .child("prizeCoverUrl/" + fileName)
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
            form.setFieldsValue({
              coverUrl:downloadURL
            });
          });
        }
      );
      onSuccess(() => console.log("success"));
    } catch (err) {
      onError(err);
      console.log(err);
    }
  };

  const customRequestVideo = async ({ onError, onSuccess, file }) => {
    const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    const fileName = file.name.replace(pattern, "");
    const uploadTask = Firebase.storage()
      .ref()
      .child("prizeVideo/" + fileName)
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
            form.setFieldsValue({
              video:downloadURL
            });
          });
        }
      );
      onSuccess(() => console.log("success"));
    } catch (err) {
      onError(err);
      console.log(err);
    }
  };


  const handleChange = async (info) => {
    if (info.file.status === "done") {
      console.log("done");
    }
    if (info.file.status === "error") {
      console.log("upload error");
    }
  };

  return (
    <Form
      name="validate_other"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      style={{maxWidth:800}}
      form={form}
      initialValues={{
        streamer:""
      }
      }
    >
      <Form.Item
        name="name"
        label="Prize Name"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Prize description"
        labelAlign='Right'
        rules={[{ required: true, message: "this field is required" }]}
      >
         <TextArea
          type="text"
          showCount
          autoSize={{ minRows: 3, maxRows: 8 }}
          maxLength={320}
        />
      </Form.Item>


      <Form.Item
        name="quantity"
        rules={[{ required: true,  message: "this field is required"}]}
        label="Quantity Available"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        />
      </Form.Item>

      <Form.Item
        name="coins"
        rules={[{ required: true,  message: "this field is required"}]}
        label="Price in Coins"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        />
      </Form.Item>

      <Form.Item
        name="level"
        label="Prize Level"
        rules={[
          {
            required: true,
            message: "Please choose level",
          },
        ]}
      >
        <Select placeholder="Select Level" style={{width:200}}>
          <Option value="Legendary">Legendary</Option>
          <Option value="Exclusive">Exclusive</Option>
          <Option value="Rare">Rare</Option>
          <Option value="Average">Average</Option>
          <Option value="Basic">Basic</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="streamerId"
        label="Streamer"
      >
        <Select placeholder="Select Streamer" style={{width:200}}>
          {streamers && streamers.map((item) => <Option value={item.userId}>{item.first_name}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item
        name="coverUrl"
        label="Cover Image"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required"}]}
        style={{marginBottom:0}}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Upload 
        onChange={handleChange}
        accept="image/*"
        customRequest={customRequestCoverUrl}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>

      <Form.Item
        name="video"
        label="Video"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required"}]}
        style={{marginBottom:0}}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Upload 
        onChange={handleChange}
        accept="video/*"
        customRequest={customRequestVideo}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>

      <Form.Item
        wrapperCol={{
          span: 12
        }}
        style={{marginTop:32}}
      >
        <Button type="primary" htmlType="submit" >
          Create New
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm;
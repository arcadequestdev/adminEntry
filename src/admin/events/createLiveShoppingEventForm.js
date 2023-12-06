import React, {useState, useMemo} from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Select,
  InputNumber,
  Upload,
  Typography,
  DatePicker
} from 'antd';
import * as API from "../../util/api";
import axios from "axios";
import firebase from "firebase/app";
import Firebase from "../../util/firebase";
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const CreateLiveShoppingEventForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {

    try {
      const requestBody = {
        ...values
      }
      const url = API.CREATE_LIVE_SHOPPING;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        form.resetFields();
        message.success("Live Shopping Event is Created")
      }else {
        message.error("Failed to create event, please try again")
      }
    }catch(err){
      message.error("Failed to create event, please try again")
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

  const customRequestBannerUrl = async ({ onError, onSuccess, file }) => {
    const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    const fileName = file.name.replace(pattern, "");
    const uploadTask = Firebase.storage()
      .ref()
      .child("productBanner/" + fileName)
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
              backgroundImage:downloadURL
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

 return <Form
      name="validate_other"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      style={{maxWidth:800}}
      form={form}
      
    >
      <Form.Item
        name="title"
        label="Event Title"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="promoter"
        label="Promoter"
        labelAlign='Right'
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="streamUrl"
        label="Stream Url"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>


      

      <Form.Item
        name="description"
        label="description"
        labelAlign='Right'
      >
         <TextArea
          type="text"
          showCount
          autoSize={{ minRows: 2, maxRows: 8 }}
          maxLength={1024}
        />
      </Form.Item>

      <Form.Item
        name="startTime"
        label="Start Time"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        name="backgroundImage"
        label="Background Image"
        labelAlign='Right'
        style={{marginBottom:0}}
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Upload 
        onChange={handleChange}
        accept="image/*"
        customRequest={customRequestBannerUrl}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>

      <Form.Item
        name="video"
        label="Promo Video"
        labelAlign='Right'
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
      label="duration"
        name="duration"
        rules={[
          {
            required: true,
            message: "Please choose duration",
          },
        ]}
      >
        <Select placeholder="Duration">
          <Option value="0.5">0.5 HR</Option>
          <Option value="1">1 HR</Option>
          <Option value="1.5">1.5 HR</Option>
          <Option value="2">2 HR</Option>
        </Select>
      </Form.Item>
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
}

export default CreateLiveShoppingEventForm;
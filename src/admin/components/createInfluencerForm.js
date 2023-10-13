import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
  Checkbox,
  Select
} from 'antd';
import React, {useMemo} from 'react';
import * as API from "../../util/api";
import axios from "axios";
import firebase from "firebase/app";
import Firebase from "../../util/firebase";
import { UploadOutlined } from '@ant-design/icons';
import countryList from 'react-select-country-list';
import {categoriesOption} from "./option";

const { TextArea } = Input;

const CreateInfluencersForm = () => {
  const [form] = Form.useForm();
  const options = useMemo(() => countryList().getData(), [])
  const onFinish = async (values) => {
    try {
      const requestBody = {
        ...values
      };
      const url = API.CREATE_INFLUENCERS;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.info('Product Created Successfully');
        form.resetFields();
      }
    }catch(err){
      console.log(err);
    }
  }


  const customRequestGraphicsUrl = async ({ onError, onSuccess, file }) => {
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
              viewerGraphics:downloadURL
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
      name=""
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      style={{maxWidth:800}}
      form={form}
      initialValues={{
        contacted:false,
        twitchPartner:false,
        mature:false,
      }}
      >
       <Form.Item
        name="name"
        label="Influencer Name"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="twitchUrl"
        label="Twitch Url"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="twitter"
        label="Twitter Url"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        labelAlign='Right'
      >
         <Select options={options} allowClear />
      </Form.Item>

      <Form.Item
        name="language"
        label="Language"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="categories"
        label="Categories"
        labelAlign='Right'
      >
          <Select
      mode="multiple"
      allowClear
      placeholder="Please select Categories"
      options={categoriesOption}
    />
      </Form.Item>

      <Form.Item
        name="contactEmail"
        label="contact(Email)"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="viewerGraphics"
        label="Viewer Graphics"
        labelAlign='Right'
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Upload 
        onChange={handleChange}
        accept="image/*"
        customRequest={customRequestGraphicsUrl}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>

      <Form.Item
        name="pricePerQuest"
        label="Price Per Quest"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        /> 
      </Form.Item>

      <Form.Item
        name="pricePerPost"
        label="Price Per Social Post"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        /> 
      </Form.Item>

      <Form.Item name="contacted" valuePropName="checked">
        <Checkbox>Contacted</Checkbox>
      </Form.Item>

      <Form.Item name="mature" valuePropName="checked">
        <Checkbox>Mature</Checkbox>
      </Form.Item>

      <Form.Item name="twitchPartner" valuePropName="checked">
        <Checkbox>Is Partner on Twitch</Checkbox>
      </Form.Item>


      <Form.Item
        name="notes"
        label="Notes"
        labelAlign='Right'
      >
         <TextArea
          type="text"
          showCount
          autoSize={{ minRows: 3, maxRows: 8 }}
          maxLength={320}
        />
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
  )
}

export default CreateInfluencersForm;
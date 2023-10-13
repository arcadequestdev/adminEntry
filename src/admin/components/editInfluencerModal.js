import React, {useMemo} from 'react';
import {  Modal, Button, Form, Input, InputNumber, message, Upload, Checkbox, Row, Col, Select} from 'antd';
import * as API from "../../util/api";
import axios from "axios";
import firebase from "firebase/app";
import Firebase from "../../util/firebase";
import { UploadOutlined } from '@ant-design/icons';
import {categoriesOption} from "./option";
import countryList from 'react-select-country-list';

const { TextArea } = Input;

const EditInfluencerModal = ({visible, currentRecord ,handleCancel, handleFinish}) => {
  const options = useMemo(() => countryList().getData(), [])
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const requestBody = {
        updatedData: {
          ...values
        },
        influencerId:currentRecord.influencerId
      };
      const url = API.EDIT_INFLUENCER;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.info('Update Successfully');
        form.resetFields();
        handleFinish()
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

  return <Modal  visible={visible} 
  title="Edit Influencer Data"
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      Return
    </Button>
  ]}>
    <Form
      name=""
      onFinish={onFinish}
      style={{maxWidth:800}}
      form={form}
      initialValues={{
        contacted:currentRecord.contacted,
        twitchPartner:currentRecord.twitchPartner,
        mature:currentRecord.mature,
        language:currentRecord.language,
        name:currentRecord.name,
        twitchUrl:currentRecord.twitchUrl,
        twitter:currentRecord.twitter,
        contactEmail:currentRecord.contactEmail,
        notes:currentRecord.notes,
        viewerGraphics:currentRecord.viewerGraphics,
        pricePerQuest:currentRecord.pricePerQuest,
        pricePerPost:currentRecord.pricePerPost,
        location:currentRecord.location??"",
        categories:currentRecord.categories??[]
      }}
      >
        <Row gutter={24}>
        
       <Form.Item
        name="name"
        label="Influencer Name"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Col span={24}>
      <Form.Item
        name="twitchUrl"
        label="Twitch Url"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>
      </Col>

      <Col span={24}>
      <Form.Item
        name="twitter"
        label="Twitter Url"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="location"
          label="Location"
          labelAlign='Right'
        >
          <Select options={options} allowClear />
        </Form.Item>
      </Col>

      <Col span={12}>
      <Form.Item
        name="language"
        label="Language"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>
      </Col>

      <Col span={24}>
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
      </Col>

      <Col span={24}>
      <Form.Item
        name="contactEmail"
        label="contact(Email)"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>
      </Col>

      <Col span={24}>
      <Form.Item
        name="viewerGraphics"
        label="Viewer Graphics"
        labelAlign='Right'
      >
        <Input autoComplete="off" />
      </Form.Item>
      </Col>

      <Col span={24}>
      <Upload 
        onChange={handleChange}
        accept="image/*"
        customRequest={customRequestGraphicsUrl}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>
      </Col>

      <Col span={12}>
        <Form.Item
          name="pricePerQuest"
          label="Price Per Quest"
        >
          <InputNumber
            min={0}
            onWheel={() => document.activeElement.blur()}
          /> 
        </Form.Item>
      </Col>

      <Col span={12}>
      <Form.Item
        name="pricePerPost"
        label="Price Per Social Post"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        /> 
      </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item name="contacted" valuePropName="checked">
          <Checkbox>Contacted</Checkbox>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item name="mature" valuePropName="checked">
          <Checkbox>Mature</Checkbox>
        </Form.Item>
      </Col>

      <Col span={8}>
      <Form.Item name="twitchPartner" valuePropName="checked">
        <Checkbox>Is Partner on Twitch</Checkbox>
      </Form.Item>
      </Col>

      </Row>
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
          Save
        </Button>
      </Form.Item>
    </Form>
  </Modal>
}

export default EditInfluencerModal;
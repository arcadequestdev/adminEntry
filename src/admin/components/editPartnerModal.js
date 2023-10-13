import React from 'react';
import {  Modal, Button, Form, Input, InputNumber, message, Upload, Checkbox, Row, Col } from 'antd';
import * as API from "../../util/api";
import axios from "axios";

const { TextArea } = Input;

const EditPartnerModal = ({visible, currentRecord ,handleCancel, handleFinish}) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      const requestBody = {
        updatedData: {...values},
        partnerId:currentRecord.partnerId
      }
      const endPoint = API.EDIT_PARTNER;
      const res = await axios.post(endPoint, requestBody);
      if(res.status === 200){
        message.success("Partner Profile is Updated");
        handleFinish()
      }else {
        message.error("Failed to Update Partner Profile, Please Try Again")
      }
    }catch(err){
      message.error("Failed to Update Partner Profile, Please Try Again")
    }
  }
  return <Modal  visible={visible} 
  title="Edit Partner Profile"
  onCancel={handleCancel}
  footer={[
    <Button key="back" onClick={handleCancel}>
      Return
    </Button>
  ]}>
    <Form
      name="validate_other"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      style={{maxWidth:800}}
      form={form}
      initialValues={{
        link:currentRecord.link,
        name:currentRecord.name,
        info:currentRecord.info
      }
      }
    >
      <Form.Item
        name="name"
        label="Company Name"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="link"
        label="Company Link"
        labelAlign='Right'
      >
         <Input autoComplete="off" />
      </Form.Item>


      <Form.Item
        name="info"
        label="Company Info"
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
          Update
        </Button>
      </Form.Item>
    </Form>
  </Modal>
}

export default EditPartnerModal;
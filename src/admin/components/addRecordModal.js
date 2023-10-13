import React, {useState, useEffect} from 'react';
import {  Modal, Button, Form, Input, Select, DatePicker, InputNumber, message } from 'antd';
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as API from "../../util/api";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const AddRecordModal = ({visible, current,handleCancel, handleFinish}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [current, form])

  const { items: partners} = useSelector((state) => state.partners);
  const onFinish = async (values) => {
    try {
      const requestBody = {
        data:{...values},
        influencerId:current
      }
      const endPoint = API.ADD_INFLUENCER_RECORD;
      const res = await axios.post(endPoint, requestBody);
      if(res.status === 200){
        message.success('Record added successfully');
        form.resetFields();
        handleFinish();
      }
    }catch(err){
      console.log(err)
      message.error("Failed to add record, please try again")
    }
  }
  return <Modal
        visible={visible} 
        title="Add Record"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>
        ]}
      >
        <Form
      name="validate_other"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      form={form}
    >
      <Form.Item
        name="companyId"
        label="Select Company"
        rules={[
          {
            required:true,
            message: 'Please Select the Partner',
          },
        ]}
      >
        <Select placeholder="Select Company" style={{minWidth:200}} >
          {partners && partners.map((item) => <Option value={item.partnerId}>{item.name}</Option>)}
        </Select>
      </Form.Item> 
      <Form.Item
        name="date"
        label="Select Date"
        rules={[{ required: true, message: "Date is required" }]}
      >
        <DatePicker showTime format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
      name="questId"
      label="Quest"
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
      name="rating"
      label="Rating(out of 10)"
      >
        <InputNumber autoComplete="off" min={0} max={10}/>
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
          Create New Record
        </Button>
      </Form.Item>
    </Form>
      </Modal>
}

export default AddRecordModal;
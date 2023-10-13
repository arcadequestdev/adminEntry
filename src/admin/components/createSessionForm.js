import {
  Button,
  Form,
  Input,
  message,
  Select,
  InputNumber
} from 'antd';
import React, {useEffect, useState, useMemo} from 'react';
import * as API from "../../util/api";
import axios from "axios";
import { useSelector } from "react-redux";

const { Option } = Select;

const CreateSessionForm = ({influencers}) => {
  const { items: partners} = useSelector((state) => state.partners);
  const { items: products} =  useSelector((state) => state.products);
  const [form] = Form.useForm();

  const selectCompanyId = Form.useWatch('partnerId', form);

  const productList = useMemo(() => {
    if(selectCompanyId){
      const list = products.filter(item => item.companyId === selectCompanyId);
      return list;
    }else {
      return [];
    }
  },[selectCompanyId, products]);

  const onFinish = async (values) => {
    try {
      const url = API.CREATE_BRAND_SESSION;
      const requestBody = {
        ...values,
      }
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("New session is created, you can add quests");
        form.resetFields()
      }else {
        message.error("Failed to create session, please try again")
      }
    }catch(err){
      console.log(err);
      message.error("Failed to create session, please try again")
    }
  }

  return <Form
      name=""
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      style={{maxWidth:800}}
      form={form}
  >
    <Form.Item
        name="title"
        label="Session Title"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="partnerId"
        label="Partner Company"
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Select placeholder="Select Company" >
          {partners && partners.map((item) => <Option value={item.partnerId}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="influencerId"
        label="Influencer"
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Select placeholder="Select Influencers" >
          {influencers && influencers.map((item) => <Option value={item.influencerId}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="productId"
        label="Product"
        rules={[
          {
            required: true,
            message: 'Please Select the Product',
          },
        ]}
      >
        <Select placeholder="Select Product" >
          {productList && productList.map((item) => <Option value={item.productId}>{item.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="totalPrize"
        label="Session Total Prize"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">Create</Button>
      </Form.Item>
  </Form>
}

export default CreateSessionForm;



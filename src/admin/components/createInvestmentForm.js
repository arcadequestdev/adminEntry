import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  DatePicker,
} from 'antd';
import React from 'react';
import * as API from "../../util/api";
import axios from "axios";

const { Option } = Select;

const InvestmentForm = ({streamers}) => {

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const url = API.CREATE_INVESTMENT;
    const targetStreamer = streamers.find(item => item.userId === values.streamerId);
    const streamerName = targetStreamer?.first_name?? "";
    const requestBody = {
      ...values,
      streamerName
    }
    try {
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.info('Investment Created Successfully');
        form.resetFields();
      }
    }catch(err){
      message.err("System Error")
    }
  }

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
        name="title"
        label="Title"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="streamerId"
        label="Streamer"
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Select placeholder="Select Streamer" style={{width:250}}>
          {streamers && streamers.map((item) => <Option value={item.userId}>{item.first_name}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item
        name="target"
        rules={[{ required: true,  message: "this field is required"}]}
        label="Target in Coins"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        />
      </Form.Item>

      <Form.Item
        name="mode"
        rules={[
          {
            required: true,
            message: "Please choose game mode",
          },
        ]}
        label="Game Mode"
      >
        <Select placeholder="Select Game Mode" style={{width:250}}>
          <Option value="SOLOS">Solos</Option>
          <Option value="DUOS">Duos</Option>
          <Option value="TRIOS">Trios</Option>
          <Option value="SQUADS">Squads</Option>
          <Option value="ARENA SOLOS">ARENA SOLOS</Option>
          <Option value="ARENA DUOS">ARENA DUOS</Option>
          <Option value="ARENA TRIOS">ARENA TRIOS</Option>
          <Option value="NB SOLOS">No Build Solos</Option>
          <Option value="NB DUOS">No Build Duos</Option>
          <Option value="NB TRIOS">No Build Trios</Option>
          <Option value="NB SQUADS">No Build Squads</Option>
          <Option value="CREATIVE 50 LIMITS">Creative 50 limits</Option>
        </Select>
      </Form.Item>


      <Form.Item
        name="closeDate"
        rules={[{ required: true, message: "close Date is required" }]}
        style={{ marginBottom: 8 }}
        label="Close Date"
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        name="startDate"
        rules={[{ required: true, message: "start Date is required" }]}
        style={{ marginBottom: 8 }}
        label="Expected Start Date"
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
  );
};

export default InvestmentForm;


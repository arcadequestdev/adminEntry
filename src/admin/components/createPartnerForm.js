import {
  Button,
  Form,
  Input,
  message,
  Select
} from 'antd';
import React from 'react';
import * as API from "../../util/api";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const CreateNewCompanyForm = () => {

  const [form] = Form.useForm();


  const onFinish = async (values) => {
    let requestBody = {
      ...values
    }
    try {
      const url = API.CREATE_PARTNER;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.info('Parnter created');
        form.resetFields();
      }

    }catch(err){
      console.log(err);
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
        link:"",
        info:""
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
        name="type"
        rules={[
          {
            required: true,
            message: "Please choose region",
          },
        ]}
        label="Company Type"
      >
        <Select placeholder="Select Type">
          <Option value="brand">Brand</Option>
          <Option value="game_publisher">Game Publisher</Option>
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
  );
};

export default CreateNewCompanyForm;
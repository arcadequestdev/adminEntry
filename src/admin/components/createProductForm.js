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


const CreateProductForm = ({partners}) => {

  const [form] = Form.useForm();


  const onFinish = async (values) => {
    try {
      const requestBody = {
        ...values
      };
      const url = API.CREATE_PRODUCT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.info('Product Created Successfully');
        form.resetFields();
      }
    }catch(err){
      console.log(err);
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
              bannerUrl:downloadURL
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

  const customRequestMobileBannerUrl = async ({ onError, onSuccess, file }) => {
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
              mobileBannerUrl:downloadURL
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

  const customRequestLowerBannerUrl = async ({ onError, onSuccess, file }) => {
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
              lowerBannerUrl:downloadURL
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

  const customRequestProductUrl = async ({ onError, onSuccess, file }) => {
    const pattern = /[`~!@#$^&*()=|{}':;',\\\[\]\<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g;
    const fileName = file.name.replace(pattern, "");
    const uploadTask = Firebase.storage()
      .ref()
      .child("productImage/" + fileName)
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
              productUrl:downloadURL
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
        description:"",
        price:0
      }
      }
    >
      <Form.Item
        name="name"
        label="Product Name"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Product description"
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
        name="price"
        label="Price"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        />
      </Form.Item>

      <Form.Item
        name="link"
        label="Product Link"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="companyId"
        label="Partner Company"
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Select placeholder="Select Company" style={{width:200}}>
          {partners && partners.map((item) => <Option value={item.partnerId}>{item.name}</Option>)}
        </Select>
      </Form.Item>

      <Form.Item
        name="bannerUrl"
        label="Banner Image"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required"}]}
        style={{marginBottom:0}}
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
        name="mobileBannerUrl"
        label="Mobile Banner Image"
        labelAlign='Right'
        style={{marginBottom:0}}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Upload 
        onChange={handleChange}
        accept="image/*"
        customRequest={customRequestMobileBannerUrl}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>

      <Form.Item
        name="lowerBannerUrl"
        label="Product Lower Banner Image"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required"}]}
        style={{marginBottom:0}}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Upload 
        onChange={handleChange}
        accept="image/*"
        customRequest={customRequestLowerBannerUrl}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>

      <Form.Item
        name="productUrl"
        label="Product Image"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required"}]}
        style={{marginBottom:0}}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Upload 
        onChange={handleChange}
        accept="image/*"
        customRequest={customRequestProductUrl}
        showUploadList={false}>
          <Button icon={<UploadOutlined />} style={{marginTop:8, marginBottom:16}}>Upload from local</Button>
      </Upload>

      <Form.Item
        name="video"
        label="Product Video"
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

export default CreateProductForm;
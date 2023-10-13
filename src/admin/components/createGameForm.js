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


const CreateGameForm = ({partners}) => {
  const [form] = Form.useForm();
  const [productImages, setProductImages] = useState([]);
  const [productImageUrl, setProductImageUrl] = useState("");

  const onFinish = async (values) => {
    const images = productImages.map((item) => {
      return item.url
    })
    try {
      const requestBody = {
        ...values,
        productImages:images
      };
      const url = API.CREATE_GAME;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success('Game Created Successfully');
        form.resetFields();
        setProductImageUrl("");
        setProductImages([])
      }else {
        message.error('Failed to create game, please try again');
      }
    }catch(err){
      message.error('Failed to create game, please try again');
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

  const customRequestProductUrl = async ({ onError, onSuccess, file }) => {
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
            const newImage = {
              status:'done',
              url:downloadURL
            }
            setProductImages(prev => {
              return [...prev, newImage]
            })
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

  const addProductImage = () => {
    if(productImageUrl){
      const newImage = {
        url:productImageUrl
      }
      setProductImages(prev => {
        return [...prev, newImage]
      })
      setProductImageUrl("")
    }
  }
  return (
    <Form
      name="validate_other"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      style={{maxWidth:800}}
      form={form}
      
    >
      <Form.Item
        name="name"
        label="Game Name"
        labelAlign='Right'
        rules={[{ required: true,  message: "this field is required" }]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        name="short_description"
        label="Short description"
        labelAlign='Right'
      >
         <TextArea
          type="text"
          showCount
          autoSize={{ minRows: 2, maxRows: 4 }}
          maxLength={256}
        />
      </Form.Item>
      <Form.Item
        name="long_description"
        label="Long description"
        labelAlign='Right'
      >
         <TextArea
          type="text"
          showCount
          autoSize={{ minRows: 8, maxRows: 16 }}
          maxLength={1024}
        />
      </Form.Item>

      <Form.Item
        name="regular_price"
        label="Regular Price"
      >
        <InputNumber
          min={0}
          onWheel={() => document.activeElement.blur()}
        />
      </Form.Item>

      <Form.Item
        name="steam_link"
        label="Steam Link"
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
        name="createdDate"
        label="Created Date"
        labelAlign='Right'
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>


      <Form.Item
        name="genre"
        label="Genre"
        labelAlign='Right'
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="categories"
        label="Categories"
        labelAlign='Right'
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="bannerUrl"
        label="Banner Image"
        labelAlign='Right'
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
        name="video"
        label="Product Video"
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
      <div style={{margin:'24px 0px'}}>
      <Text style={{display:"block", marginBottom:8}}>Product Images</Text>

      <Input.Group compact style={{marginBottom:8}}>
      <Input style={{ width: 'calc(100% - 170px)' }} value={productImageUrl} onChange={(e) => {
        setProductImageUrl(e.target.value)
      }} />
      <Button type="primary" onClick={addProductImage}>Add Product Image Url</Button>
    </Input.Group>

          <Upload
            accept="image/*"
            listType="picture"
            className="upload-list-inline"
            customRequest={customRequestProductUrl}
            fileList={productImages}
            onRemove={(file) => {
              setProductImages(prev => {
                const newList = prev.filter(item => item !== file);
                return newList;
              })
            }}
            >
            <Button icon={<UploadOutlined />}>Upload From Local</Button>
        </Upload>
      </div>
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

export default CreateGameForm;
import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { Select } from 'antd';

const EventAddGameForm = ({ visible, onCreate, onCancel, games }) => {
  const options = (games??[]).map((item) => {
    return {
      value:item.gameId,
      label:item.name
    }
  })
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible} 
      title="Add Promote Game"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="gameName"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the name of the game!',
            },
          ]}
        >
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={options}
          />
        </Form.Item>
          
        <Form.Item
          name="promotePrice"
          label="Promote Price in USD"
          rules={[
            {
              required: true,
              message: 'Please enter the price',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="copies"
          label="Number of Copies"
          rules={[
            {
              required: true,
              message: 'Please enter the number of copies',
            },
          ]}
        >
          <Input />
        </Form.Item>
       
      </Form>
    </Modal>
  );
};

export default EventAddGameForm;
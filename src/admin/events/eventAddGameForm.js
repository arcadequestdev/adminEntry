import { Button, Form, Input, Modal, Radio, Typography} from 'antd';
import React, { useMemo } from 'react';
import { Select, message} from 'antd';
import * as API from "../../util/api";
import axios from "axios";

const { Title } = Typography;

const EventAddGameForm = ({ visible, onCancel, games, event }) => {
  const options = (games??[]).map((item) => {
    return {
      value:item.gameId,
      label:item.name
    }
  });

  const addGameToEvent = async (values) => {
    try {
      const game = games.find(item => item.gameId === values.gameId);
      const gameName = game?.name;
      const availableCopies = game?.codesForSale?.length?? 0;
      if(parseInt(values.copies) > availableCopies){
        message.error("This Game does not have enough copies");
        throw new Error("No Enough Copies")
      }
      const requestBody = {
        ...values,
        gameName,
        eventId:event.eventId
      }
      const url = API.ADD_GAME_TO_EVENT;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Game is added to event, copies are reserved");
        form.resetFields();
        onCancel()
      }else {
        message.error("Failed to add game, please try again")
      }
    }catch(err){
      message.error("Failed to add game, please try again")
    }
  }

  
  const [form] = Form.useForm();
  const selectedGameId = Form.useWatch('gameId', form);
  const selectedGame = useMemo(() => {
    if(selectedGameId){
      return games.find(item => item.gameId === selectedGameId);
    }
  }, [selectedGameId, games]);

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
            addGameToEvent(values)
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
          name="gameId"
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

        {
          selectedGame && <div>
            <Title level={5}>
              Original Price: {selectedGame?.original_price}
            </Title>
            <Title level={5}>
              Available Copies: {selectedGame?.codesForSale?.length??0}
            </Title>
          </div>
        }
          
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
import React, { useMemo, useState } from 'react';
import { message, Modal, Input, Typography} from 'antd';
import * as API from "../../util/api";
import axios from "axios";

const { Title } = Typography;

const AddCopiesModal = ({visible, onCancel, currentGameId, event, games}) => {
  const [copies, setCopies] = useState("");

  const game = games.find(item => item.gameId === currentGameId);

  const addCopies = async () => {
    const numbersOfCopies = parseInt(copies);
    try {
      const requestBody = {
        gameId:currentGameId,
        copies:numbersOfCopies,
        eventId:event.eventId
      }
      const url = API.EVENT_GAME_REFILL;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        onCancel();
        message.success("Copies are added to event")
      }else {
        message.error("Failed to add copies, please try again")
      }
    }catch(err){
      console.log(err)
      message.error("Failed to add copies, please try again")
    }
  }

  return <Modal
  visible={visible} 
  title="Add Copies"
  okText="Confirm"
  cancelText="Cancel"
  onCancel={onCancel}
  onOk={() => {
    addCopies()
  }}
  >
    {
          game && <div>
            <Title level={5}>
              Name: {game.name}
            </Title>
            <Title level={5}>
              Available Copies: {game?.codesForSale?.length??0}
            </Title>
          </div>
        }
    <Input value={copies} onChange={(e) => {
      setCopies(e.target.value)
    }}/>
  </Modal>
}

export default AddCopiesModal;

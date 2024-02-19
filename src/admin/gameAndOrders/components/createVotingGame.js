import React, {useState, useMemo} from 'react';
import {
  Button,
  Input,
  message,
  Select
} from 'antd';
import * as API from "../../../util/api";
import axios from "axios";
import { debounce } from "lodash";

const CreateVotingGame = ({partners}) => {
  const [appId, setAppId] = useState("");

  const [loading, setLoading] = useState(false);

  const debounceCreatNewGame = debounce(() => {
    createNewGame()
  },500);

  const createNewGame = async() => {
    try {
      const requestBody = {
        appId
      }
      const res = await axios.post(API.ADD_STEAM_GAME_VOTING, requestBody);
      if(res.status === 200){
        setLoading(false);
        setAppId("");
        message.success("New Game is added")
      }
    }catch(err){
      setLoading(false);
      message.error("Please enter valid steam app id")
    }
  }

  return <>
       <div style={{display:'flex'}}>
        <Input value={appId} onChange={(e) => {
            setAppId(e.target.value)
          }}
          style={{width:200, marginRight:24}}
          placeholder='Enter steam app id'
          />
          <Button type="primary" onClick={() => {
                if(!loading){
                  setLoading(true);
                  debounceCreatNewGame()
                }
              }}>
                Add Game
            </Button>
        </div>

  </>
}

export default CreateVotingGame;
import React, {useState, useMemo} from 'react';
import {
  Button,
  Input,
  message,
  Select
} from 'antd';
import * as API from "../../util/api";
import axios from "axios";
import { debounce } from "lodash";

const { Option } = Select;

const CreateGameByAppId = ({partners}) => {
  const [appId, setAppId] = useState("");
  const [company, setCompany] = useState(null);
  const [gameDetail, setGameDetail] = useState(null);

  const [loading, setLoading] = useState(false);

  const searchGame = async () => {
    if(appId !== ""){
      try {
        const res = await axios.get(API.CHECK_GAME, {
          params: {
            appId
          }
        });
        const data = res.data;
        setGameDetail(data);
      }catch(err){
        message.error("There is no game related to the steam app id you provide")
      }
    }else {
      message.error("Please enter valid steam app id")
    }
  }

  const debounceCreatNewGame = debounce(() => {
    createNewGame()
  },500);

  const createNewGame = async () => {
    if(appId && gameDetail && company && !gameDetail.existed){
      const targetPartner = partners.find(item => item.partnerId === company);
      const publisher = targetPartner?.name;
      const requestBody = {
        appId,
        companyId:company,
        publisher
      }
      try {
        const res = await axios.post(API.CREATE_GAME, requestBody);
        if(res.status === 200){
          const {gameId} = res.data;
          setLoading(false);
          setAppId("");
          setCompany(null)
          setGameDetail(null);
          message.success("New Game is created")
        }else {
          setLoading(false);
          message.error("Failed to add new game, please try again")
        }
      }catch(err){
        setLoading(false);
        message.error("Failed to add new game, please try again")
      }
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
          <Select placeholder="Select Company" style={{width:200, marginRight:24}} onChange={(value) => {
            setCompany(value)
          }}
          >
          {partners && partners.map((item) => <Option value={item.partnerId}>{item.name}</Option>)}
        </Select>
          <Button onClick={() => {
            searchGame()
          }}>
            Search For Game
          </Button>
        </div>
        {
          gameDetail && <div style={{display:'flex', marginTop:24, alignItems:'center'}}>
            <div style={{marginRight:24}}>
              Game Name: {gameDetail.name}
            </div>
            <div style={{marginRight:24}}>
              Status:  {
                gameDetail.existed? 'Already Stored In the Database' : 'Available to Add'
              }
            </div>
            {
              !gameDetail.existed && <Button type="primary" onClick={() => {
                if(!loading){
                  setLoading(true);
                  debounceCreatNewGame()
                }
              }}>
                Add Game
              </Button>
            }
          </div>
        }
  </>
}

export default CreateGameByAppId;

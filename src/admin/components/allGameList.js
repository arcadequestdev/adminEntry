import React, {useEffect, useState, useMemo} from 'react';
import { Table, Button, message} from 'antd';
import axios from 'axios';
import * as API from "../../util/api";
import SetPriceModal from './setPriceModal';
import AddGameKeysModal from './addGameKeysModal';


const AllGameList = ({games}) => {

  const [streamingData, setStreamingData] = useState([]);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [keysModalOpen, setKeysModalOpen] = useState(false);

  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
  
    const getStreamingData = async () => {
      try {
        const res = await axios.get(API.GET_ALLGAME_STREAMING_DATA);
        if(res.status === 200){
          const {gameList} = res.data;
          setStreamingData(gameList)
        }
      }catch(err){
        console.log(err);
      }
    }

    getStreamingData()
  }, []);


  const putOnIndex = async (gameId, status) => {
    try {
      const requestBody = {
        gameId,
        promoted:status
      }
      const url = API.CHANGE_GAME_STATUS;
      const res = await axios.post(url, requestBody);
      if(res.status === 200){
        message.success("Game status changed")
      }else {
        message.error("Failed to change status")
      }
    }catch(err){
      message.error("Failed to change status")
    }
  }

  const dataSourece = useMemo(() => {
    const gamesWithCount =  games.map((item) => {
      const twitchAssigned = item.detailOnTwitch ? true: false;
      const findItem = streamingData.find(game => game.gameId === item.gameId);
      const streamingCount = findItem ? findItem.currentStreaming : 0;
      return {
        ...item,
        twitchAssigned,
        streamingCount
      }
    });

    return gamesWithCount.sort((a,b) => 
      b.streamingCount - a.streamingCount
    )
  }, [games, streamingData])

  const columns = [
    {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title:"Publisher",
    dataIndex:'publisher',
    key:'publisher'
  },
  {
    title:'Assigned On Twitched',
    key:'twitchAssigned',
    render:(record) => {
      return <>
      {record.twitchAssigned ? 'Assigned':"Not Assigned"}
      </>
    }
  },
  {
    title:"Current Streaming Count",
    key:'streamingCount',
    dataIndex:"streamingCount",
    sorter: (a, b) => b.streamingCount - a.streamingCount,
  },
  {
    title:'',
    render:(record) => {
      if(record.promoted){
        return <Button onClick={() => {
          putOnIndex(record.gameId, false)
        }}>
          Remove from Promote Page
        </Button>
      }else {
        return <Button type="primary" onClick={() => {
          putOnIndex(record.gameId, true)
        }}>
          Put on Promote Page
        </Button>
      }
    },
    filters: [
      {
        text: 'On Promote Page',
        value: true,
      },
      {
        text: 'Not On Promote Page',
        value: false
      },
    ],
    onFilter: (value, record) => record.promoted === value,
  },
  {
    title:"Promote Price",
    render:(record) => {
      return <Button type="primary" onClick={() => {
        setCurrentId(record.gameId)
        setPriceModalOpen(true)
      }}>
        Set Price
      </Button>
    }
  },
  {
    title:"Keys",
    render:(record) => {
      return <Button type="primary" onClick={() => {
        setCurrentId(record.gameId)
        setKeysModalOpen(true)
      }}>
        Manage Keys
      </Button>
    }
  }
]

  const currentRecord = useMemo(() => {
    const target = games.find(item => item.gameId === currentId);
    if(target){
      return target;
    }else {
      return null;
    }
  }, [currentId, games])

  return <>
  <Table columns={columns} dataSource={dataSourece} />
  {
    currentRecord && <SetPriceModal
    currentRecord={currentRecord}
    visible={priceModalOpen}
    handleCancel={() => {
      setPriceModalOpen(false)
    }}
    handleFinish={() => {
      setPriceModalOpen(false);
      setCurrentId(null)
    }}
/>
  }
  {
    currentRecord && <AddGameKeysModal 
    currentRecord={currentRecord}
    visible={keysModalOpen}
    handleCancel={() => {
      setKeysModalOpen(false)
    }}
    handleFinish={() => {
      setKeysModalOpen(false);
      setCurrentId(null)
    }}
    />
  }
  </>
}

export default AllGameList;
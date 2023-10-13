import React, {useEffect, useState} from 'react';
import { Descriptions, Collapse, Button } from 'antd';
import Firebase from "../../util/firebase";
import ReactPlayer from "react-player";

const { Panel } = Collapse;

const ProductList = ({partnerId, games}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      let result = [];
      for(let i=0; i< games.length; i++){
        const gameRef = Firebase.firestore().collection("partnerGames").doc(games[i]);
        try {
          const doc = await gameRef.get();
          const data = doc.data();
          const obj = {
            ...data,
            gameId:games[i]
          }
          result.push(obj);
        }catch(err){
          console.log(err)
        }
      }
      setList(result);
    }
    fetchProducts();
  },[games]);


  return <Collapse>
  {
    list.map((item) => {
      return <Panel header={item.name} key={item.productId}>
      <Descriptions bordered labelStyle={{width:'10%'}}>
      <Descriptions.Item label="Name" span={3}>{item.name}</Descriptions.Item>
      <Descriptions.Item label="Link" span={3}>
        {item.steam_link}
      </Descriptions.Item>
      <Descriptions.Item label="Short Description" span={3}>
      {item.short_description}
      </Descriptions.Item>
      <Descriptions.Item label="Long Description" span={3}>
      {item.long_description}
      </Descriptions.Item>
      <Descriptions.Item label="Banner Image" span={2}>
      <img src={item.bannerUrl} style={{width:100}} alt="bannerUrl" />
    </Descriptions.Item>
    <Descriptions.Item label="Regular Price" span={2}>
      {item.regular_price}
    </Descriptions.Item>
    <Descriptions.Item label="Product Image" span={3}>
      {
        (item.productImages??[]).map((image) => {
          return <img src={image} style={{width:100, marginRight:24}} alt="product"/>
        })
      }

    </Descriptions.Item>
    <Descriptions.Item label="Video" span={3}>
    <ReactPlayer
              url={item.video}
              playing={false}
              width="200px"
              height="200px"
              controls
            />
    </Descriptions.Item>
    </Descriptions>
    </Panel>
    })
  }
  </Collapse>

}

export default ProductList;
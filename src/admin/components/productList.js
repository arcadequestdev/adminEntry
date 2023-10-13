import React, {useEffect, useState} from 'react';
import { Descriptions, Collapse, Button } from 'antd';
import Firebase from "../../util/firebase";
import ReactPlayer from "react-player";

const { Panel } = Collapse;

const ProductList = ({partnerId, products}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      let result = [];
      for(let i=0; i< products.length; i++){
        const productRef = Firebase.firestore().collection("partnerProducts").doc(products[i]);
        try {
          const doc = await productRef.get();
          const data = doc.data();
          const obj = {
            ...data,
            productId:products[i]
          }
          result.push(obj);
        }catch(err){
          console.log(err)
        }
      }
      setList(result);
    }
    fetchProducts();
  },[products]);


  return <Collapse>
  {
    list.map((item) => {
      return <Panel header={item.name} key={item.productId}>
      <Descriptions bordered labelStyle={{width:'10%'}}>
      <Descriptions.Item label="Name" span={3}>{item.name}</Descriptions.Item>
      <Descriptions.Item label="Link" span={3}>
        {item.link}
      </Descriptions.Item>
      <Descriptions.Item label="Info" span={3}>
      {item.Descriptions}
      </Descriptions.Item>
      <Descriptions.Item label="Banner Image" span={2}>
      <img src={item.bannerUrl} style={{width:50}} alt="bannerUrl" />
    </Descriptions.Item>
    <Descriptions.Item label="Product Image" span={2}>
      <img src={item.productUrl} style={{width:50}} alt="bannerUrl"/>
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
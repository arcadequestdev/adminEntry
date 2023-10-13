import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AreaChartOutlined,
  UsergroupAddOutlined,
  GiftOutlined,
  UserAddOutlined,
  TableOutlined,
  CustomerServiceOutlined,
  WalletOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  PayCircleOutlined,
RocketOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import ChangePermission from './changePermission';
import GivePrize from './givePrize';
import DashBoard from "./dashboard";
import Partner from './partner';
import Subscribers from "./subscribers"
import Exchange from "./exchange";
import Firebase from "../util/firebase";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Influencer from './influencer';
import Session from './session';
import { useDispatch } from "react-redux";
const { Header, Sider, Content } = Layout;

const Board = ({history}) => {
  const [option, setOption] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
  const [players, setPlayers] = useState([]);
  const [streamers, setStreamers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const {  profile } = useSelector((state) => state.user);


  const dispatch = useDispatch();

  const logout = () => ({
    type:"LOG_OUT",
    payload:null
  });


  useEffect(() => {
    let userListener = null;
    let matchListener = null;
   const checkPermission = () => {
    const permission_level = profile?.permission_level ?? 0;
    if(!profile || permission_level !== 2){
      history.push("/login")
    }
   }

   const fetchUser = () => {
      const permission_level = profile?.permission_level ?? 0;
      if (permission_level === 2) {
        userListener = Firebase.firestore()
          .collection("users")
          .orderBy("joined_date",'desc')
          .onSnapshot(function (querySnapshot) {
            let users = [];
            querySnapshot.forEach(function (doc) {
              const user = {
                ...doc.data(),
                userId: doc.id,
              };
              users.push(user);
            });
            const players = users.filter(item => item.permission_level === 0);
            const streamers = users.filter(item => item.permission_level === 1);
            const admins = users.filter(item => item.permission_level === 2);
            setPlayers(users);
            setStreamers(streamers);
            setAdmins(admins);
          });
      }
    }

    checkPermission()
    fetchUser();

    return () => {
      if(userListener){
        userListener()
      }
      if(matchListener){
        matchListener()
      }
    }
  },[profile, history]);


  useEffect(() => {
    const listener  = Firebase.firestore().collection('influencer')
      .onSnapshot(querySnapshot => {
        let result = []
        querySnapshot.docs.forEach(doc => {
        const obj = {
          ...doc.data(),
          influencerId: doc.id
        }
        result.push(obj);
      });
      setInfluencers(result)
    });
    return () => {
      listener();
    }
  },[])


  return (
    <Layout style={{height:"100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
            style={{
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent:'center',
              color:'white',
              backgroundColor:'grey',
              margin:'12px',
            }}
          >
Admin
          </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={option}
          /* items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Change Permission',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'Give Reward',
            },
          ]} */
        >
           <Menu.Item key="1" icon={<AreaChartOutlined />} onClick={()=> {
             setOption("1")
           }}>
          Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UsergroupAddOutlined />} onClick={()=> {
             setOption("2")
           }}>
          Users
          </Menu.Item>
          <Menu.Item key="3" icon={<GiftOutlined />} onClick={()=> {
             setOption("3")
           }}>
          Prizes
          </Menu.Item>
         {/*  <Menu.Item key="4" icon={<WalletOutlined />} onClick={()=> {
             setOption("4")
           }}>
          Digital Prizes
          </Menu.Item> */}
          {/* <Menu.Item key="5" icon={<UserAddOutlined />} onClick={()=> {
             setOption("5")
           }}>
          Creators
          </Menu.Item> */}
         {/*  <Menu.Item key="6" icon={<CustomerServiceOutlined />} onClick={()=> {
             setOption("6")
           }}>
          Matches
          </Menu.Item> */}
          <Menu.Item key="7" icon={<AppstoreOutlined />} onClick={()=> {
             setOption("7")
           }}>
          Partner Companys
          </Menu.Item>
          <Menu.Item key="8" icon={<AppstoreOutlined />} onClick={()=> {
             setOption("8")
           }}>
          Subscribers
          </Menu.Item>
          <Menu.Item key="9" icon={<DollarCircleOutlined />} onClick={()=> {
             setOption("9")
           }}>
          Exchange
          </Menu.Item>
         {/*  <Menu.Item key="10" icon={<PayCircleOutlined />} onClick={()=> {
             setOption("10")
           }}>
          Investment
          </Menu.Item> */}
          <Menu.Item key="11" icon={<UsergroupAddOutlined />} onClick={()=> {
             setOption("11")
           }}>
          Influencer
          </Menu.Item>  
          <Menu.Item key="12" icon={<RocketOutlined />} onClick={()=> {
             setOption("12")
           }}>
          Brand Session
          </Menu.Item> 
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
           {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Button style={{height:42, marginLeft:16}} onClick={() => {dispatch(logout())}}>Back To Main Site</Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            maxHeight:1000,
            overflowY:"scroll"
          }}
        >
          {
            option === "1" && <DashBoard players={players} streamers={streamers}/>
          }
          {
            option === "2" && <ChangePermission players={players}/>
          }
          {
            option === "3" && <GivePrize />
          }
{/*           {
            option === "4" && <DigitalPrize streamers={streamers}/>
          } */}
 {/*          {
            option === "5" && <StreamerData streamers={streamers} matches={matches}/>
          }
          {
            option === "6" && <MatchStatus matches={matches}/>
          } */}
          {
            option === "7" && <Partner />
          }
          {
            option === "8" && <Subscribers players={players}/>
          }
          {
            option === "9" && <Exchange players={players} streamers={streamers} admins={admins}/>
          }
{/*           {
            option === "10" && <Investment streamers={streamers} />
          } */}
          {
            option === "11" && <Influencer influencers={influencers}/>
          }
          {
            option === '12' && <Session influencers={influencers} />
          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(Board);
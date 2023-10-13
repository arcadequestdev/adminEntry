import React, { useEffect, useState, useMemo } from "react";
import Firebase from "../util/firebase";
import "@ant-design/flowchart/dist/index.css";
import { Column } from '@ant-design/plots';
import styled from "styled-components";
import moment from "moment";
import { Card, Statistic, Col, Divider, Row} from 'antd';
import { Pie } from '@ant-design/plots';

const DashBoard = ({players, streamers}) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [current, setCurrent] = useState({});

  const fetchData = async () => {
    const resultCompare = (a, b) => {
      const time1 = a.createdAt;
      const time2 = b.createdAt;
      if (moment(time1).isBefore(time2)) {
        return -1;
      }
      if (moment(time1).isAfter(time2)) {
        return 1;
      }
      return 0;
    };

    Firebase.firestore()
    .collection("platform_monthly")
    .onSnapshot(function (snapshot){
      let result = [];
    snapshot.forEach((doc) => {
      const data = {
        ...doc.data(),
        orderId:doc.id
      };
      result.push(data);
    })
    const sortedResult = result.sort(resultCompare);
    console.log(sortedResult)
    const currentMonth = sortedResult.pop();
    setCurrent(currentMonth);
    const length = sortedResult.length;
    const currentYearData = sortedResult.slice(length-12, length);
    setMonthlyData(currentYearData);
    })
  };

  useEffect(() => {
    fetchData();
  },[]);

  const globalData = useMemo(() => {
    const users = players.length;
    const activeSubs = players.filter(item => item.multiplier && moment(item.multiplier.renewAt).isAfter(moment()));
    const activeSubsCount = activeSubs.length;
    const unActiveSubs = players.filter(item => item.multiplier && moment(item.multiplier.renewAt).isBefore(moment()));
    const unActiveSubsCount = unActiveSubs.length;
    const streamersLength = streamers.length;
    const verifyUsers = players.filter(item => item.verify_status === 2);
    const verifyUsersCount = verifyUsers.length;
    return {
      users,
      activeSubsCount,
      unActiveSubsCount,
      streamers:streamersLength,
      verifyUsers:verifyUsersCount,
    }
  },[players, streamers]);


  const getMonthlyUserData = () => {
    const data = [];
    if(monthlyData && monthlyData.length > 0){
      monthlyData.forEach((item) => {
        const {createdAt, newUsers} = item;
        const newObj = {
          month:moment(createdAt).format("MMM, YY"),
          number:newUsers
        };
        data.push(newObj)
      })
    }
    return data;
  };

  const getMonthlyQuestData = () => {
    const data = [];
    if(monthlyData && monthlyData.length > 0){
      monthlyData.forEach((item) => {
        const {createdAt} = item;
        const newObj = {
          month:moment(createdAt).format("MMM, YY"),
          number:item?.newQuest?? 0
        };
        data.push(newObj)
      })
    }
    return data;
  };

  const getMonthlySubsData = () => {
    const data = [];
    if(monthlyData && monthlyData.length > 0){
      monthlyData.forEach((item) => {
        const {createdAt} = item;
        const newObj = {
          month:moment(createdAt).format("MMM, YY"),
          number:item?.newMultiplierSubs?? 0
        };
        data.push(newObj)
      })
    }
    return data;
  };

  const getMonthlyCoinsData = () => {
    const data = [];
    if(monthlyData && monthlyData.length > 0){
      monthlyData.forEach((item) => {
        const {createdAt} = item;
        const newObj = {
          month:moment(createdAt).format("MMM, YY"),
          number:`${(item?.coinsRedeem?? 0)/1000}`
        };
        data.push(newObj)
      })
    }
    return data;

  }

  const monthlyUserData = getMonthlyUserData()

  const monthlyMatchesData = getMonthlyQuestData();

  const monthlySubsData = getMonthlySubsData();

  const monthlyCoinsData = getMonthlyCoinsData();
  
  const userConfig = {
    data:monthlyUserData,
    xField: 'month',
    yField: 'number',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'date',
      },
      number: {
        alias: 'number',
      },
    },
  };

  const matchConfig = {
    data:monthlyMatchesData,
    xField: 'month',
    yField: 'number',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'date',
      },
      number: {
        alias: 'number',
      },
    },
  };

  const subsConfig = {
    data:monthlySubsData,
    xField: 'month',
    yField: 'number',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'date',
      },
      number: {
        alias: 'number',
      },
    },
  };

  const coinsConfig = {
    data:monthlyCoinsData,
    xField: 'month',
    yField: 'number',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'date',
      },
      number: {
        alias: 'number',
      },
    },
  };

  return <div>
     <Row gutter={16}>
      <Col span={8}>
      <Card title="Current Month Data" extra={<span>{moment().startOf("month").format("MMMM ,YYYY")}</span>} style={{ marginBottom:32}}>
      <div style={{display:'flex', justifyContent:'space-around', width:'100%'}}>
          <Statistic title="Users" value={current?.newUsers?? 0} />
         <Statistic title="Quests" value={current?.newQuest?? 0} />
         <Statistic title="Coins Redeem" value={current?.coinsRedeem?? 0} />
         <Statistic title="Multiplier Subs" value={current?.newMultiplierSubs?? 0} />
      </div>
    </Card>
      </Col>
      <Col span={16}>
      <Card title="All Time Data" style={{ marginBottom:32}}>
      <div style={{display:'flex', justifyContent:'space-around', width:'100%'}}>
        <Statistic title="Users Count" value={globalData?.users?? 0} />
        <Statistic title="Streamers Count" value={globalData?.streamers?? 0} />
        <Statistic title="Verified User" value={globalData?.verifyUsers?? 0} />
         <Statistic title="Active Subscribers" value={globalData?.activeSubsCount?? 0} />
         <Statistic title="UnActive Subscribers" value={globalData?.unActiveSubsCount?? 0} />
      </div>
    </Card>
      </Col>
    </Row>
    <Divider />
    <ChartContainer>
    <Part>
      <h2>New Users</h2>
    <Column {...userConfig} style={{height:300, marginTop:16}}/>
    </Part>
    <Part>
      <h2>New Quests</h2>
    <Column {...matchConfig} style={{height:300, marginTop:16}}/>
    </Part>
    
    </ChartContainer>
    <ChartContainer>
    <Part>
      <h2>New Subs</h2>
    <Column {...subsConfig} style={{height:300, marginTop:16}}/>
    </Part>
    <Part>
    <h2>Coins Redeem</h2>
    <Column {...coinsConfig} style={{height:300, marginTop:16}}/>
    </Part>
    </ChartContainer>
  </div>
}

const ChartContainer = styled.div`
display:flex;
justify-content:space-between;
margin-bottom:24px;
`;

const Part = styled.div`
width:45%;
flex-wrap:wrap;
`;


export default React.memo(DashBoard);
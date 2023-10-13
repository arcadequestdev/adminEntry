import React, { Component, Fragment } from "react";
import Firebase from "../util/firebase";
import { Table, Divider } from "antd";
import styled from "styled-components";
import moment from "moment";

class StreamerTable extends Component{
  state = {
    sortedMatches:new Map()
  }
  async componentDidMount(){
    await this.sortResult();
  }

  sortResult= () => {
    const {matches} = this.props;
    const timeStampArray = ["2022-07-01","2022-06-01","2022-05-01","2022-04-01","2022-03-01","2022-02-01","2022-01-01","2021-12-01","2021-11-01", "2021-10-01", "2021-09-01", "2021-08-01", "2021-07-01", "2021-06-01", "2021-05-01", "2021-04-01", "2021-03-01", "2021-02-01"];
    const timeMap = new Map();
    timeStampArray.forEach((item) => {
      timeMap.set(item, []);
    })
    matches.forEach((item) => {
      if(item.createdAt){
        const stamp = moment(item.createdAt).startOf('month').format("YYYY-MM-DD");
        const array = timeMap.get(stamp);
        if(array){
          array.push(item);
        }
        timeMap.set(stamp, array);
      }
    });
    this.setState({
      sortedMatches:timeMap
    })
  }

  render(){
    const {streamer} = this.props;
    const {sortedMatches} = this.state;
    const columns = [
      {
        title:'Matches',
        dataIndex:"matchCount"
      },
      {
        title:"Total Entries",
        dataIndex:"totalEntries"
      },
      {
        title:"Start Date",
        dataIndex:"startDate"
      }
    ];
    const data = [];
    for(const entry of sortedMatches){
      const startDate = entry[0];
      const matches  = entry[1]??[];
      const matchCount = matches?.length?? 0;
      let totalEntries = 0;
      matches.forEach((item) => {
        const entries = item?.participant_ids?.length??0 - item?.freeEntryList?.length??0;
        totalEntries = totalEntries + entries;
      })
      const newData = {
        startDate,
        matchCount,
        totalEntries,
      }
      data.push(newData);
    }
    const pagination = {
      pageSize: 5,
    };

    return <Container>
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={pagination}
      />
      <Divider />
    </Container>
  }
}

const Container = styled.div`
`;


export default StreamerTable;
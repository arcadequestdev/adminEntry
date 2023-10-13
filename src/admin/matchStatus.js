import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import Firebase from "../util/firebase";
import { Table, Button } from "antd";
import styled from "styled-components";
import moment from "moment";

class MatchStatus extends Component {

  /*  getStatus = () => {
    const {matches} = this.props;
    const timeStampArray = ["2022-11-01","2022-10-01","2022-09-01","2022-08-01","2022-07-01","2022-06-01","2022-05-01","2022-04-01","2022-03-01","2022-02-01","2022-01-01","2021-12-01","2021-11-01", "2021-10-01", "2021-09-01", "2021-08-01", "2021-07-01", "2021-06-01", "2021-05-01", "2021-04-01", "2021-03-01", "2021-02-01"];
    const timeMap = new Map();
    timeStampArray.forEach((item) => {
      timeMap.set(item, 0);
    })

    matches.forEach((item) => {
        const stamp = moment(item.createdAt).startOf('month').format("YYYY-MM-DD");
      let number = timeMap.get(stamp);
      number++;
      timeMap.set(stamp, number);
    });
    console.log(timeMap, 'data');
  } */
  
  render() {
    const { matches } = this.props;
    const { user } = this.props;
    const permission_level = user.profile?.permission_level ?? 0;
    const data = [];
    let targetMatches = matches.filter(
      (item) => !item.isTest && item.participant_ids?.length > 8
    );
    const matchCompare = (a, b) => {
      const time1 = a.createdAt;
      const time2 = b.createdAt;
      if (moment(time1).isBefore(time2)) {
        return 1;
      }
      if (moment(time1).isAfter(time2)) {
        return -1;
      }
      return 0;
    };
    targetMatches = targetMatches.sort(matchCompare);
    for (let i = 0; i < targetMatches.length; i++) {
      const {
        fornite_username,
        participant_ids,
        freeEntryList,
        token_cost,
        createdAt,
        title,
        status,
        participantsStatus
      } = targetMatches[i];
      const item = {
        title: title,
        streamer: fornite_username,
        totalParticipants: participant_ids.length - 1,
        entry: token_cost,
        createdAt: moment(createdAt).format("lll"),
      };
      if (freeEntryList) {
        item.freeEntry = freeEntryList.length;
        item.payUser = participant_ids.length - freeEntryList.length - 1;
        const subUser = participantsStatus.filter((item) => item.joinAs === 'SUB_USER');
        const coinsUser = participantsStatus.filter((item) => item.joinAs === 'PAY_USER')
        item.subUserCount = subUser.length;
        item.coinsUserCount = coinsUser.length;
      } else {
        item.freeEntry = 0;
        item.payUser = participant_ids.length - 1;
      }
      if (status === 5) {
        item.isCancelled = true;
      } else {
        item.isCancelled = false;
      }
      data.push(item);
    }

    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Streamer",
        dataIndex: "streamer",
        key: "streamer",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Total Participants",
        dataIndex: "totalParticipants",
        key: "totalParticipants",
      },
      {
        title: "PayUser User",
        dataIndex: "payUser",
        key: "payUser",
      },
      {
        title: "Sub User",
        dataIndex: "subUserCount",
        key: "subUserCount",
      },
      {
        title: "Coin User",
        dataIndex: "coinsUserCount",
        key: "coinsUserCount",
      },
      {
        title: "Free User",
        dataIndex: "freeEntry",
        key: "freeEntry",
      },
     
    ];
    return (
      <Container>
        {permission_level === 2 ? (
          <Fragment>
            <Table columns={columns} dataSource={data} showHeader={true} />
          </Fragment>
        ) : (
          <div>You do not have access</div>
        )}
      </Container>
    );
  }
}

const Container = styled.div`
`;

const mapStateToProps = ({ user }) => ({ user });

export default compose(withRouter, connect(mapStateToProps))(React.memo(MatchStatus));

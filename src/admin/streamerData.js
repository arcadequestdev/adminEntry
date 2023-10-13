import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import StreamerTable from "./streamerTable";
import styled from "styled-components";
import { Collapse } from 'antd';

const { Panel } = Collapse;


const StreamerData = ({streamers, matches}) => {
  const filterMatches = (id) => {
    const result = matches.filter(item => item.owner_id === id);
    return result
  }
  return <Container>
    <Collapse ghost>
    {
    streamers.length > 0 && streamers.map((item, index) =>
    <Panel header={item.first_name || item.savedEpicName } key={index}>
      <StreamerTable streamer={item} key={item.userId} matches={filterMatches(item.userId)}/>
    </Panel>
    )
  }
    </Collapse>
  </Container>
}

const Container = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff 0% 0% no-repeat padding-box;
  position: relative;
`;

const mapStateToProps = ({ user}) => ({ user});

export default compose(withRouter, connect(mapStateToProps))(React.memo(StreamerData));
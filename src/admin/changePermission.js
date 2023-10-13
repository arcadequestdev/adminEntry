import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Firebase from "../util/firebase";
import { Table, Button, Input, Dropdown, Menu, Space} from "antd";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import * as API from "../util/api";
import moment from "moment";
import { ExportToCsv } from 'export-to-csv';
import GiveToken from "./components/giveToken"


const ChangePermission = (props) => {
  const [show, setShow] = useState('users');
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const exportToCsv = () => {
    const { players } = this.props;
    const data = [];
    for (let i = 0; i < players.length; i++) {
      const user = players[i];
      const { email, first_name, token_count } = user;
      const item = {
        email,
        name:first_name,
        token_count
      };
      data.push(item);
    };
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'ArcadeQuest Users',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
   
  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(data);
  }

  const { players } = props;

  let data = [];

  for (let i = 0; i < players.length; i++) {
    const user = players[i];
    const { email, first_name, last_name, permission_level, userId, joined_date, savedEpicName, token_count, transId } = user;
    const joined = joined_date ? moment(joined_date.toDate()).format("l"):"";
    const item = {
      email,
      first_name,
      last_name,
      permission_level,
      userId,
      key: userId,
      joined,
      savedEpicName,
      token_count,
      transId
    };
    data.push(item);
  }

  // ... [The rest of the component render logic remains largely the same]

  let selectedData = data;

  if (searchText !== "") {
    selectedData = data.filter(
      (item) => item.email && item.email.includes(searchText)
    );
  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined At",
      dataIndex: "joined",
      key: "joined",
    },


    {
      title: "Give Coins",
      key: "give",
      render: (text, record) => {
          return (
            <Button
              type="primary"
              onClick={() => {
                setSelectedUser(record);
                setShow('give')
              }}
           >
              Give Coins
            </Button>
          );
        }
      },
  ];

  return (
    <Container>
      <ToastContainer />
        <>
          {show === "users"  && (
            <>
              <TopContainer>
                <h3>Players</h3>
                <StyledInput
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button onClick={exportToCsv}>Export Players To CSV </Button>
              </TopContainer>
              <Table
                columns={columns}  // Columns definition needs to be moved outside or defined inline here.
                dataSource={selectedData}
                showHeader={true}
              />
            </>
          )}
          {show === 'give'  && (
            <>
              <GiveToken current={selectedUser} key={selectedUser?.userId} goToPlayers={() => {
                setSelectedUser(null);
                setShow('users');
              }}/>
            </>
          )}
        </>
      
    </Container>
  );
}

const Container = styled.div`
  
`;

const TopContainer = styled.div`
display:flex;
align-items:center;
`;

const StyledInput = styled(Input)`
  height: 40px;
  margin: 24px;
  width: 240px;
  border-radius: 11px;
`;

export default withRouter(ChangePermission);
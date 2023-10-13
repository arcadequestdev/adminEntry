import React, { useState, useEffect, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { Button, Input, Card, InputNumber, Table } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import * as API from "../../util/api";
import * as TransTypes from "../../util/transConstant";
import moment from "moment";
import { ArrowLeftOutlined } from '@ant-design/icons';
import Firebase from "../../util/firebase";
import { useSelector } from "react-redux";

const GiveToken = ({current, goToPlayers }) => {
  const { profile, id: userId} = useSelector((state) => state.user);
  const [amount, setAmount] = useState(0);
  const [history, setHistory] = useState([]);

  const fetchHistory = useCallback(async () => {
    const { transId } = current;
    const transRef = Firebase.firestore()
      .collection("transactions")
      .doc(transId);
    const transDoc = await transRef.get();
    const transData = transDoc.data();
    const { history } = transData;
    setHistory(history);
  }, [current]);

  useEffect(() => {
    fetchHistory();
  }, [current, fetchHistory]);


  const changeAmount = (value) => {
    setAmount(value);
  };

  const giveToken = async () => {
    const { userId, transId } = current;
    // Note: Ensure that "id" is defined or replace it with a valid user identifier.

    if (typeof amount === "number" && amount > 0) {
      try {
        const url = API.ADMIN_GIVE_TOKEN;
        const requestBody = {
          userId,
          transId,
          amount,
          from: userId,
        };
        const res = await axios.post(url, requestBody);
        if (res.status === 200) {
          fetchHistory();
          setAmount(0);
          toast.success("Give Token Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        } else {
          toast.error("Give Token Failed", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        }
      } catch (err) {
        console.log(err);
        toast.error(err, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } else {
      toast.error("Please enter a valid number greater than 0", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  const data = [];
  if (history.length >= 1) {
    for (let i = 0; i < history.length; i++) {
      const {
        amount_type,
        currentBalance,
        message,
        transAmount,
        type,
        time,
      } = history[i];
      let amountText = "";
      if (amount_type === TransTypes.INCREASE_TOKEN) {
        amountText = "+" + transAmount;
      } else {
        amountText = "-" + transAmount;
      }
      let timeText = "";
      if (moment(time).format().toString() === "Invalid date") {
        timeText = time;
      } else {
        timeText = moment(time).format("lll");
      }
      const item = {
        time: timeText,
        amount: amountText,
        type,
        message,
        currentBalance,
      };
      data.unshift(item);
    }
  }

  const pagination = {
    pageSize: 100,
  };

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "time",
      key: "submittedrank",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Current Balance",
      dataIndex: "currentBalance",
      key: "balance",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <div>
      <ToastContainer />
      <>
        <Button 
          style={{marginBottom:16, font: "normal normal bold 18px SF PRO, serif", height:36}} 
          onClick={goToPlayers}
        >
          <ArrowLeftOutlined />
          Go Back To Players
        </Button>
        <Card style={{ width: 400 }}>
          <p>Email:{current.email}</p>
          <p>EpicName:{current.savedEpicName ?? ""}</p>
          <p>UserId:{current.userId}</p>
          <p>Current Token:{current.token_count}</p>
          <InputNumber
            min={0}
            onChange={changeAmount}
            value={amount}
          />
          <Button
            onClick={giveToken}
            style={{ marginLeft: 32 }}
            type="primary"
          >
            Give Coins
          </Button>
        </Card>
        <h4>History</h4>
        <Table
                  columns={columns}
                  dataSource={data}
                  showHeader={true}
                  pagination={pagination}
                />
      </>
    </div>
  );
};

export default withRouter(GiveToken);

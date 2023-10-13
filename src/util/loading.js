import React from "react";
import styled from "styled-components";
import { Spin, Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#F72375" }} spin />
  );

  return (
    <div>
      <Spin
        indicator={antIcon}
        style={{ textAlign: "left", marginBottom: 32 }}
      />
      <LoadingText>Loading</LoadingText>
      <Skeleton active={true} />
    </div>
  );
};

const LoadingText = styled.span`
  display: block;
  font: normal normal bold 24px/28px SF PRO, serif;
  letter-spacing: 0px;
  color: #bfbfbf;
  margin-bottom: 32px;
`;

export default Loading;
import React from "react";
import styled from "styled-components";
import PrizeBank from "./components/prizeBank";
import { useSelector } from "react-redux";

const GivePrize = () => {
  const { profile } = useSelector((state) => state.user);
  return (
    <>
    {profile?.permission_level??0 === 2 ? <>
      <Container>
        <PrizeBank />
      </Container>
    </> : <div>You do not have access</div>
    }
    </>
  )
}

const Container = styled.div`
`;

export default React.memo(GivePrize);


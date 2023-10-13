import styled from "styled-components";
import React, {useState, useMemo, useEffect} from "react";
import { Input, Modal, Button} from 'antd';
import { debounce } from "lodash";
import * as API from "../../util/api";
import axios from "axios";
import Firebase from "../../util/firebase";


const LinkMatchModal = ({current, modalOpen, setModalOpen, setCurrent}) => {
    const [linkedMatch, setLinkedMatch]= useState(null);
    
    useEffect(() => {
      const fetchMatch = async (matchId) => {
        try {
          const matchRef = Firebase.firestore().collection("matches").doc(matchId);
          const matchDoc = await matchRef.get();
          if(matchDoc.exists){
            const matchDetail = matchDoc.data();
            setLinkedMatch(matchDetail);
          }
        }catch(err){
          console.log(err);
        }
      }
      if(current && current.linkedMatch){
        fetchMatch(current.linkedMatch);
      }
    },[current])
    


    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const debounceConfirm = debounce(() => {
      confirm();
    },500);

    const confirm = async () => {
      if(input !== ""){
        try {
          const requestBody = {
            matchId:input,
            investmentId:current.investmentId
          }
          const url = API.LINK_MATCH_WITH_INVESTMENT;
          const res = await axios.post(url, requestBody);
          if(res.status === 200){
            setLoading(false);
            setModalOpen(false);
            setCurrent(null);
          }
        }catch(err){
          console.log(err);
        }
      }
    }

    return <Modal title={`Link Match`} visible={modalOpen}  onCancel={()=> {
      setModalOpen(false);
      setCurrent(null);
      setInput("")
    }}
    style={{padding:'8px 16px'}}
    footer={[
      <Button key="back" onClick={()=> {
        setModalOpen(false);
        setCurrent(null);
        setInput("")
      }}>
        Cancel
      </Button>
        ]}>
       <div style={{display:'flex', margin:'24px'}}>
         {
           linkedMatch ? <Detail>
           <div>
           Match Name: {
              linkedMatch.title
            }
           </div>
           </Detail> : <>
           <Input placeholder="Enter the link Match Id " onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          style={{marginRight:12}}
          />
          <Button type="primary" onClick={() => {
            if(!loading){
              setLoading(true);
              debounceConfirm();
            }
          }} disabled={loading}>{loading? "loading":"Confirm"}</Button> 
           </>
         }
    </div>

    </Modal>
}

const Detail = styled.div`
display:flex;
flex-direction:column;
width:100%;
text-align:left;
`;

export default LinkMatchModal;
import React, {useCallback, useState} from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import styled from "styled-components";
/* import ForgetPasswordModal from "../components/forgetPasswordModal"; */
import { useDispatch } from "react-redux";

//firebase
import Firebase, { googleProvider } from "../util/firebase";

import * as API from "../util/api";
import axios from "axios";
import { Mixpanel } from "../util/mixpanel";

const Login = ({location, history}) => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const loginProfile = (profile, id) => ({
    type:"LOG_IN",
    profile,
    id
  });

  const updateProfile = (profile) => ({
    type:"UPDATE_PROFILE",
    payload:profile
  });

  const dispatch = useDispatch();


  const checkUser = async (user, uid) => {
    try {
      const userRef = Firebase.firestore().collection("users").doc(uid);
      const doc = await userRef.get();
    if(!doc.exists){
      const name = user.displayName? user.displayName.split(" ")[0]:"";
      const email = user.email;
      const requestBody = {
        uid,
        name,
        email,
        role:"influencer"
      }
      const endpoint = API.CREATE_USER_DOC_WITHROLE;
      await axios.post(endpoint, requestBody);
      setTimeout(() => {
        processUserWithGoogle(uid)
      },500)
    }else {
      processUserWithGoogle(uid)
    }
    Mixpanel.track("[WEB] Google Login")
    }catch(err){
      console.log(err);
      message.error("Failed to Sign In with Google, Please Try Again")
      setGoogleLoading(false);
    } 
  }


  const signInWithGoogle = () => {
  Firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...
    if(user.uid) {
      checkUser(user, user.uid);
    }
  }).catch((error) => {
    message.error("Failed to Sign In with Google, Please Try Again")
    setGoogleLoading(false);
    console.log(error, 'error')
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }


  const login =  async (values) => {
    setLoading(true);
    const { email, password } = values;

    try {
      const data = await Firebase.auth().signInWithEmailAndPassword(email, password);
      if(data.user.emailVerified){
        processUser(data.user.uid);
      }else {
        data.user
        .sendEmailVerification()
        .then(function () {
          message.info("You haven't verify your email, verifaction link is sent to your email box");
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }catch(err){
      console.log(err)
      setLoading(false);
      if (err.code === "auth/user-not-found") {
        message.error("You don't have an account. Please sign up first!")
      } else if (err.code === "auth/wrong-password") {
        message.error("Email and Password are not match")
      } else {
        message.error("Error! Please contact us!")
      }
    }
  }

  const storUserData = (userData, id) => {
    dispatch(loginProfile(userData, id));
    Firebase.firestore()
    .collection("users")
    .doc(id)
    .onSnapshot((doc) => {
      const data = doc.data();
      dispatch(updateProfile(data))
    });
  }

  const processUserWithGoogle = async (id) => {

    const userRef = Firebase.firestore().collection("users").doc(id);
    
    try {
      const userData = (await userRef.get()).data();
      if(userData){
        storUserData(userData, id);
        history.push("/")
      }
    }catch(err){
      message.error("Failed to Sign In with Google, Please Try Again")
      console.log(err);
    }finally {
      setGoogleLoading(false);
    }
  }

  const processUser = async (id) => {
    const userRef = Firebase.firestore().collection("users").doc(id);
    
    try {
      const userData = (await userRef.get()).data();
      if(userData){
        storUserData(userData, id);
        history.push("/")
      }
  }catch(err){
      console.log(err);
    }finally {
      setLoading(false);
    }
  }

  const toSignUp = () => {
    history.push(`/signup`);
  }


  return <Container>
    <SignUpForm>
      <Title>Login to ArcadeQuest</Title>
      {
        googleLoading ? <GoogleContainer>
          Loading With Google...
        </GoogleContainer>: <img
              src="/assets/google_login.svg"
              alt="google"
              style={{ width:345, cursor:'pointer' }}
              onClick={() => {
                if(!googleLoading){
                  setGoogleLoading(true)
                  signInWithGoogle()
                }
              }}
            />
      }
      <Divider>
        or
      </Divider>
      <Form
        style={{ margin: "0 auto" }}
        name="nest-messages"
        onFinish={login}
      >
        <Label>Email</Label>
        <Form.Item
          name="email"
          wrapperCol={24}
          rules={[{ required: true, message: "email is required" }]}
        >
          <Input
            style={{
              width: 345,
              marginTop: 8,
              height: 32,
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              borderRadius: 7,
              border: "1px solid #000000",
            }}
            placeholder="Email"
          />
        </Form.Item>
        <Label>Password</Label>
        <Form.Item
          name="password"
          wrapperCol={24}
          rules={[{ required: true, message: "password is required" }]}
        >
          <Input
            style={{
              width: 345,
              height: 32,
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              borderRadius: 7,
              border: "1px solid #000000",
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8 }}>
          <Button
            htmlType="submit"
            disabled={loading}
            style={{
              width: 144,
              height: 49,
              border: "none",
              borderRadius: 11,
              font: "normal normal bold 18px/17px SF PRO, serif",
              color: "#FFFFFF",
              background: loading
                ? "#B7B7B7 0% 0% no-repeat padding-box"
                : "#F72375 0% 0% no-repeat padding-box",
              /* boxShadow: loading
                ? "0px 16px 24px #B7B7B7"
                : "0px 12px 24px #F7237569;", */
            }}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
      <Bottom>
        <Instruction>Don’t have an account?</Instruction>
        <SignUpText onClick={toSignUp}>Sign Up</SignUpText>
      </Bottom>
    </SignUpForm>
</Container>
}

const ForgetText = styled.span`
  cursor: pointer;
  text-decoration: underline;
  width: auto;
`;

const Forgot = styled.div`
  width: 345px;
  margin: 8px auto;
  font: normal normal normal 16px/18px SF PRO, serif;
  letter-spacing: 0px;
  color: #b7b7b7;
  text-align: right;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  background: #000000 0% 0% no-repeat padding-box;
  position: absolute;
  min-height: calc(100vh);
`;

const SignUpForm = styled.div`
  height: auto;
  text-align: center;
  width: 345px;
  margin:108px auto;
  .ant-input:focus,
  .ant-input-focused {
    box-shadow: none !important;
    border: 0.5px solid #000000 !important;
  }
  .ant-form-item {
    margin-bottom:16px;
  }
`;

const Title = styled.div`
  text-align: left;
  font: normal normal 600 24px/53px SF PRO, serif;
  letter-spacing: 0px;
  color: #000000;
  margin-bottom: 16px;
  color: #FFFFFF;
`;

const Label = styled.span`
  text-align: left;
  font: normal normal 600 18px SF PRO, serif;
  letter-spacing: 0px;
  color: #000000;
  width: 345px;
  display: block;
`;

const Bottom = styled.div`
  text-align: left;
`;

const Instruction = styled.span`
  text-align: left;
  font: normal normal normal 16px/18px SF PRO, serif;
  letter-spacing: 0px;
  color: #b7b7b7;
`;

const SignUpText = styled.span`
  text-decoration: underline;
  font: normal normal normal 16px/53px SF PRO, serif;
  letter-spacing: 0px;
  color: #f72375;
  margin-left: 16px;
  cursor: pointer;

`;


const Divider = styled.div`
text-align: center;
font: normal normal 600 16px SF PRO, serif;
letter-spacing: 0px;
color: #D6D6D6;
width:345px;
margin-top:16px;
`;

const GoogleContainer = styled.div`
width: 345px;
height: 54px;
/* UI Properties */
background: #FFFFFF 0% 0% no-repeat padding-box;
border-radius: 10px;
background: #B7B7B7 0% 0% no-repeat padding-box; 
cursor: not-allowed;
font:normal normal 600 24px/54px SF PRO, serif;
text-align:center;
color: #FFFFFF;
`;




export default withRouter(Login);
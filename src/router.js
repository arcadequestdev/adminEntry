import React, {useEffect} from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Firebase from "./util/firebase";
//Action
import { updateLinkedProfile, updateProfile } from "./action/user";
import { getProducts } from "./action/products";
import { getPartners } from "./action/partner";

import Login from "./home/login";
import { useSelector } from "react-redux";
import adminEntry from "./admin/layout"

// influencer portal

// router

const Router = ({updateProfile, getPartners, getProducts, updateLinkedProfile}) => {
  const { loggedIn, profile, id: userId} = useSelector((state) => state.user);

  useEffect(() => {
    const getProfileUpdate = () => {
      if (loggedIn) {
        Firebase.firestore()
          .collection("users")
          .doc(userId)
          .onSnapshot((doc) => {
            const data = doc.data();
            updateProfile(data)
          });
      }
    };


    try {
      getProfileUpdate();
      getPartners();
      getProducts()
    } catch(err){
      console.log(err);
    }
  }, [updateProfile, userId, loggedIn, getPartners, getProducts]);

  useEffect(() => {
    const getInfluencerProfile = async (influencerId) => {
        Firebase.firestore()
        .collection("influencer")
        .doc(influencerId)
        .onSnapshot((doc) => {
          const data = doc.data();
          updateLinkedProfile(data)
        });
    }
    try {
      if(profile) {
        if(profile.permission_level === 3 && profile.influencerId){
          getInfluencerProfile(profile.influencerId);
        }
        if(profile.permission_level === 5 && profile.adminOfInfluencer){
          getInfluencerProfile(profile.adminOfInfluencer)
        }
      }
    }catch(err){
      console.log(err);
    }
  }, [profile, updateLinkedProfile])

  return <BrowserRouter>
   <Route exact path="/" component={adminEntry} />
   <Route exact path="/login" component={Login} />
  </BrowserRouter>
}


const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateProfile,
  getPartners,
  getProducts,
  updateLinkedProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
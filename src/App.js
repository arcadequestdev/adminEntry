import React, { Component } from "react";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import "antd/dist/antd.css";
import { PersistGate } from "redux-persist/integration/react";

import Router from "./router";
import {Helmet} from "react-helmet";

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <Helmet>
            <title>ArcadeQuest Influencer</title>
            <meta name="description" content="Connecting influencers and their community through interactive games on ArcadeQuest. Join the gaming revolution." />
            <meta name="keywords" content="ArcadeQuest, influencers, community, interactive games, gaming" />
           </Helmet>
            <Router />
          </PersistGate>
        </Provider>
    );
  }
}

export default App;

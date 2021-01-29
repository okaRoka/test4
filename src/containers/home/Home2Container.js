import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../components/home/Home2Component';
import TalkContainer from '../talk/TalkContainer';
import Settings from '../../components/settings/SettingsComponent';

import BookContainer from '../book/BookContainer';
import HistoryContainer from '../report/rHistory/HistoryContainer';
import SetDocumentContainer from '../report/rSetDocument/SetDocumentContainer';
import LessContainer from '../less/LessContainer';

import ChatContainer from '../talk/tChat/ChatContainer';

const Home2Container = () => {
  useEffect(() => {
    console.log('Home2Container:useEffectによる初回処理');
  }, []);

  return (
    <div>
      <Switch>
        <Route
          path="/home2"
          exact
          component={Home}
        />
        <Route
          path="/home2/talk"
          exact
          render={() => <TalkContainer page={2} />}
        />
        <Route
          path="/home2/settings"
          exact
          render={() => <Settings page={2} />}
        />

        <Route
          path="/home2/book"
          exact
          component={BookContainer}
        />
        <Route
          path="/home2/book/rHistory"
          exact
          render={() => <HistoryContainer />}
        />
        <Route
          path="/home2/book/rSetDocument"
          exact
          render={() => <SetDocumentContainer />}
        />
        <Route
          path="/home2/less"
          exact
          component={LessContainer}
        />

        <Route
          path="/home2/talk/tChat"
          exact
          render={() => <ChatContainer />}
        />
      </Switch>
    </div>
  );
};

export default Home2Container;

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { Chat } from '../pages/Chat';
import { SignIn } from '../pages/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/chat" component={Chat} />
  </Switch>
);

export default Routes;
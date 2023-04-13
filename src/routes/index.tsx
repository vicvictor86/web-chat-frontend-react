import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { Chat } from '../pages/Chat';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/chat" component={Chat} />
    <Route path="/sign-up" component={SignUp} />
  </Switch>
);

export default Routes;
import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { Chat } from '../pages/Chat';
import { LogIn } from '../pages/LogIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Chat} />
  </Switch>
);

export default Routes;
import React, {Fragment} from 'react';
import { Switch, Route } from "react-router-dom";
import Posts from './Posts';
import Header from './Header';

const Main = () => {
  return <Switch>
    <Fragment>
      <Header />
      <Route exact path="/" component={Posts} />
    </Fragment>
  </Switch>
}

export default Main;
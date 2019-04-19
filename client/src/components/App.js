import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import UserList from './UserList';
import LessonList from './LessonList';
import Claim from './Claim';
import Report from './Report';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Menu} />
            <Route exact path="/userlist" component={UserList} />
            <Route exact path="/lessonlist" component={LessonList} />
            <Route exact path="/claim" component={Claim} />
            <Route exact path="/report" component={Report} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

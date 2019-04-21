import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './Menu';
import UserList from './User/UserList';
import LessonList from './Lesson/LessonList';
import NewLesson from './Lesson/NewLesson';
import UpdateLesson from './Lesson/UpdateLesson';
import Claim from './Claim';
import Report from './Report';
import UpdateUser from './User/UpdateUser';
import NewUser from './User/Newuser';

import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Menu} />
            <Route exact path="/userlist" component={UserList} />
            <Route exact path="/user/update/:id" component={UpdateUser} />
            <Route exact path="/user/new" component={NewUser} />
            <Route exact path="/lessonlist" component={LessonList} />
            <Route exact path="/lesson/new" component={NewLesson} />
            <Route exact path="/lesson/update/:id" component={UpdateLesson} />
            <Route exact path="/claim" component={Claim} />
            <Route exact path="/report" component={Report} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

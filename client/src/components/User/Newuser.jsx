import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';

import * as actions from '../../actions';

class NewUser extends Component {
  render() {
    return (
      <div className="container">
        <h3>顧客追加</h3>
        <form
          onSubmit={this.props.handleSubmit(values =>
            this.props.submitUser(values, this.props.history)
          )}
        >
          <div>
            <label>名前</label>
            <Field name="name" type="text" component="input" />
          </div>
          <div>
            <label>性別</label>
            <div>
              <Field className="browser-default" name="sex" component="select">
                <option />
                <option value="男">男</option>
                <option value="女">女</option>
              </Field>
            </div>
          </div>
          <div>
            <label>年齢</label>
            <Field name="age" type="text" component="input" />
          </div>
          <Link to="/userlist" className="grey waves-effect waves-light btn">
            戻る
          </Link>
          <button type="submit" className="grey waves-effect waves-light btn">
            登録
          </button>
        </form>
      </div>
    );
  }
}

export default compose(
  connect(
    '',
    actions
  ),
  reduxForm({ form: 'userForm' }),
  withRouter
)(NewUser);

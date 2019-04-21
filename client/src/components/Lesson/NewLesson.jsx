import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter, Link } from 'react-router-dom';

import renderField from '../utils/renderField';
import * as actions from '../../actions';

class NewLesson extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUserList() {
    return this.props.users.map(user => {
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <h3>レッスン受講記録登録</h3>
        <form
          onSubmit={this.props.handleSubmit(values =>
            this.props.submitLesson(values, this.props.history)
          )}
        >
          <div>
            <label>顧客名</label>
            <Field
              className="browser-default"
              name="user_id"
              type="text"
              component="select"
            >
              <option />
              {this.renderUserList()}
            </Field>
          </div>
          <div>
            <label>ジャンル</label>
            <div>
              <Field
                className="browser-default"
                name="genre"
                component="select"
              >
                <option />
                <option value="英語">英語</option>
                <option value="プログラミング">プログラミング</option>
                <option value="ファイナンス">ファイナンス</option>
              </Field>
            </div>
          </div>
          <div>
            <label>受講日</label>
            <Field name="date" type="date" component="input" />
          </div>
          <div>
            <Field
              name="hours"
              label="受講時間"
              type="text"
              component={renderField}
            />
          </div>
          <Link to="/lessonlist" className="grey waves-effect waves-light btn">
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

function mapStateToProps({ users }) {
  return { users };
}

const validate = values => {
  const errors = {};
  if (values.hours < 1 || values.hours > 12) {
    errors.hours = '時間は1~12の範囲で入力してください';
  }
  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: 'lessonForm', validate }),
  withRouter
)(NewLesson);

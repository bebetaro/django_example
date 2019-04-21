import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';
import { isArray } from 'util';

class Claim extends Component {
  renderClaimTable() {
    return this.props.claim.map(user => {
      if (isArray(user.genre)) {
        const genre_count = user.genre[0];
        user.genre.shift();
        const genre_content = user.genre.join('/');

        return (
          <tr key={user.user}>
            <td>{user.user}</td>
            <td>{user.name}</td>
            <td>{`${genre_content}(${genre_count})`}</td>
            <td>{user.count}</td>
            <td>{user.price}</td>
          </tr>
        );
      } else {
        const genre_content = '';
        const genre_count = user.genre;

        return (
          <tr key={user.user}>
            <td>{user.user}</td>
            <td>{user.name}</td>
            <td>{`${genre_content}(${genre_count})`}</td>
            <td>{user.count}</td>
            <td>{user.price}</td>
          </tr>
        );
      }
    });
  }

  render() {
    const dt = new Date();
    const year = dt.getFullYear();
    const thismonth = dt.getMonth() + 1;
    const lastMonth = thismonth === 1 ? 12 : thismonth - 1;
    const twomonth = lastMonth === 1 ? 12 : lastMonth - 1;
    return (
      <div className="container">
        <h3>請求一覧</h3>
        <form>
          <label>請求月</label>
          <Field
            className="browser-default"
            name="month"
            component="select"
            onChange={e => this.props.fetchClaim(e.target.value)}
          >
            <option />
            <option value={thismonth}>{`${year}年${thismonth}月`}</option>
            <option value={lastMonth}>{`${year}年${lastMonth}月`}</option>
            <option value={twomonth}>{`${year}年${twomonth}月`}</option>
          </Field>
        </form>
        <table className="striped">
          <thead>
            <tr>
              <th>顧客ID</th>
              <th>顧客名</th>
              <th>ジャンル</th>
              <th>合計レッスン数</th>
              <th>請求金額</th>
            </tr>
          </thead>
          <tbody>{this.renderClaimTable()}</tbody>
        </table>
        <Link className="grey waves-effect waves-light btn" to="/">
          Menu
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ claim }) {
  return { claim };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: 'claimForm' })
)(Claim);

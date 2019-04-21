import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUserList() {
    return this.props.users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.sex}</td>
          <td>{user.age}</td>
          <td className="grey waves-effect waves-light btn">
            <Link to={`user/update/${user.id}`}>編集</Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>顧客一覧</h3>
        <table className="striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>年齢</th>
              <th>性別</th>
            </tr>
          </thead>
          <tbody>{this.renderUserList()}</tbody>
        </table>
        <Link className="grey waves-effect waves-light btn" to="/">
          Menu
        </Link>
        <Link className="grey waves-effect waves-light btn" to="user/new">
          新規追加
        </Link>
      </div>
    );
  }
}

function mapStateProps({ users }) {
  return { users };
}

export default connect(
  mapStateProps,
  actions
)(UserList);

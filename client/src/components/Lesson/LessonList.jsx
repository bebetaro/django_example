import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class UserList extends Component {
  componentDidMount() {
    this.props.fetchlessons();
    console.log(this.props.lessons);
  }

  renderLessonList() {
    return this.props.lessons.map(lesson => {
      return (
        <tr key={lesson.id}>
          <td>{lesson.user.id}</td>
          <td>{lesson.user.name}</td>
          <td>{lesson.genre}</td>
          <td>{lesson.date}</td>
          <td>{lesson.hours}</td>
          <td>{lesson.money}</td>
          <td className="grey waves-effect waves-light btn">
            <Link to={`lesson/update/${lesson.id}`}>編集</Link>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>レッスン受講記録一覧</h3>
        <table className="striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>受講者</th>
              <th>ジャンル</th>
              <th>受講日</th>
              <th>受講時間</th>
              <th>支払い金額</th>
            </tr>
          </thead>
          <tbody>{this.renderLessonList()}</tbody>
        </table>
        <Link className="grey waves-effect waves-light btn" to="/">
          Menu
        </Link>
        <Link className="grey waves-effect waves-light btn" to="lesson/new">
          新規追加
        </Link>
      </div>
    );
  }
}

function mapStateProps({ lessons }) {
  return { lessons };
}

export default connect(
  mapStateProps,
  actions
)(UserList);

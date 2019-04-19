import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <h3>メニュー</h3>
      <ul>
        <li>
          <Link to="/userlist">顧客一覧</Link>
        </li>
        <li>
          <Link to="/lessonlist">レッスン受講記録</Link>
        </li>
        <li>
          <Link to="/claim">月別請求一覧</Link>
        </li>
        <li>
          <Link to="/report">レポート</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;

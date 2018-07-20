import React, {Component} from 'react';
import {Link} from 'react-router'

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        404 page <br/>
        <Link to="/">Вернуться на главную</Link>
      </div>
    )
  }
}

export default NotFoundPage;

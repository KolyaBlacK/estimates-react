import React, {Component} from 'react';
import PropTypes from 'prop-types';

class App extends Component {

  render() {
    const {children} = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;

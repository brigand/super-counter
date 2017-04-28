import React from 'react';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-timeago';

export default
class TimeSince extends React.Component {
  static propTypes = {
    time: PropTypes.any.isRequired,
  };

  render() {
    return <ReactTimeAgo date={this.props.time} />;
  }
}



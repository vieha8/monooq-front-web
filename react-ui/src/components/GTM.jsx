import React from 'react';

class GoogleTagManager extends React.Component {
  componentDidMount() {
    window.dataLayer.push({ event: this.props.event });
  }

  render() {
    return null;
  }
}

export default GoogleTagManager;

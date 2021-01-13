import React from 'react';
import { handleGTM } from 'helpers/gtm';

class GoogleTagManager extends React.Component {
  componentDidMount() {
    const { event } = this.props;
    handleGTM(event);
  }

  render() {
    return null;
  }
}

export default GoogleTagManager;

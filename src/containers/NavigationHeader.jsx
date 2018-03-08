import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationHeader from 'components/NavigationHeader';
import UserMenu from 'components/Menu/UserMenu';
import HostMenu from 'components/Menu/HostMenu';

class NavigationHeaderContainer extends Component {
  render() {
    return (
      <NavigationHeader />
    );
  }
}

export default connect()(NavigationHeaderContainer);

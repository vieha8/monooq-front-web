import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserMenu from 'components/Menu/UserMenu';
import HostMenu from 'components/Menu/HostMenu';

class InquiryContainer extends Component {
  render() {
    const { showMobile } = this.props;
    return (
      <UserMenu showMobile={showMobile} />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
});

export default connect(mapStateToProps)(InquiryContainer);

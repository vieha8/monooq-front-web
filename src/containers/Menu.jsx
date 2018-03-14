import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserMenu from 'components/Menu/UserMenu';

class InquiryContainer extends Component {
  render() {
    const { auth, showMobile } = this.props;
    return (
      <UserMenu showMobile={showMobile} userId={auth.user.id} />
      // ホストメニュー出す場合 (TODO ホストID指定する)
      // <HostMenu showMobile={showMobile} hostId={auth.user.id} />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
});

export default connect(mapStateToProps)(InquiryContainer);

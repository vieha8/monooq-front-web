import React, { Component } from 'react';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import Inquiry from 'components/LV3/Inquiry';
import connect from '../connect';

class InquiryContainer extends Component<*> {
  render() {
    const { isLogin } = this.props;
    return <Inquiry isLogin={isLogin} />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
});

export default ContentPageMenu(
  connect(
    InquiryContainer,
    mapStateToProps,
  ),
  {
    headline: 'お問い合わせ',
  },
);

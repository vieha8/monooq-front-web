import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import Inquiry from 'components/Inquiry';
import { uiActions } from 'redux/modules/ui';

class InquiryContainer extends Component {
  onClickSend = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      sendInquiry: true,
    }));
  }

  render() {
    // const { ui } = this.props;

    return (
      <Page title="モノオクに連絡する" subTitle="サービスの不明点・お困りのことがあればモノオクカスタマーサポートまでお寄せください。">
        <Menu />
        <Inquiry onClickSend={this.onClickSend} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(InquiryContainer);

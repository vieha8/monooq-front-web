import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import UserMenu from 'components/Menu/UserMenu';
import Unsubscribe from 'components/Unsubscribe';
import UnsubscribeCompleted from 'components/Unsubscribe/Completed';
import UnsubscribeFailed from 'components/Unsubscribe/Failed';
import { uiActions } from 'redux/modules/ui';

class UnsubscribeContainer extends Component {
  onClickUnsubscribe = () => {
    const { dispatch } = this.props;
    dispatch(uiActions.setUiState({
      completion: true,
    }));
  }

  renderCompleted() {
    return (
      <Page>
        <UnsubscribeCompleted />
      </Page>
    );
  }

  renderFailed() {
    return (
      <Page>
        <UnsubscribeFailed />
      </Page>
    );
  }

  render() {
    const { ui } = this.props;

    if (ui.completion) {
      return this.renderCompletion();
    }

    return (
      <Page title="退会する" subTitle="モノオクをご利用頂き、どうもありがとうございました。サービス改善の為にアンケートにご協力ください。">
        <UserMenu />
        <Unsubscribe onClickUnsubscribe={this.onClickUnsubscribe} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(UnsubscribeContainer);

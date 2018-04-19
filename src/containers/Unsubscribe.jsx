import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Menu from 'containers/Menu';
import Unsubscribe from 'components/Unsubscribe';
import UnsubscribeCompleted from 'components/Unsubscribe/Completed';
import { uiActions } from 'redux/modules/ui';
import { authActions } from "../redux/modules/auth";

class UnsubscribeContainer extends Component {
  onClickUnsubscribe = () => {
    const { dispatch, auth } = this.props;

    dispatch(authActions.unsubscribe({userId: auth.user.ID}));
    dispatch(authActions.logout());

    dispatch(uiActions.setUiState({
      completion: true,
    }));

    window.scrollTo(0, 0);
  }

  renderCompleted = () => (
    <Page>
      <UnsubscribeCompleted />
    </Page>
  );

  render() {
    const { ui } = this.props;

    if (ui.completion) {
      return this.renderCompleted();
    }

    return (
      <Page title="退会する" subTitle="モノオクをご利用頂き、ありがとうございました。サービス改善の為にアンケートにご協力ください。">
        <Menu />
        <Unsubscribe onClickUnsubscribe={this.onClickUnsubscribe} />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

export default connect(mapStateToProps)(UnsubscribeContainer);

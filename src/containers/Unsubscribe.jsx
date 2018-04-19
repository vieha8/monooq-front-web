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
    const { dispatch, auth, ui } = this.props;

    dispatch(authActions.unsubscribe({userId: auth.user.ID, reason: ui.reason, description: ui.description}));

    // dispatch(uiActions.setUiState({
    //   completion: true,
    // }));

    window.scrollTo(0, 0);
  }

  renderCompleted = () => (
    <Page>
      <UnsubscribeCompleted />
    </Page>
  );

  handleChangeText = (event) => {
    this.props.dispatch(uiActions.setUiState({
      description: event.target.value,
    }));
  };

  handleChangeReason = (event, data) => {
    this.props.dispatch(uiActions.setUiState({
      reason: data.value,
    }));
  };

  render() {
    const { ui } = this.props;

    if (ui.completion) {
      return this.renderCompleted();
    }

    return (
      <Page title="退会する" subTitle="モノオクをご利用頂き、ありがとうございました。サービス改善の為にアンケートにご協力ください。">
        <Menu />
        <Unsubscribe
          onClickUnsubscribe={this.onClickUnsubscribe}
          ui={ui}
          handleChangeText={this.handleChangeText}
          handleChangeReason={this.handleChangeReason}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  auth: state.auth,
});

export default connect(mapStateToProps)(UnsubscribeContainer);

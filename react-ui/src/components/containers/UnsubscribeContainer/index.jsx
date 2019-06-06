// @flow

import React, { Component } from 'react';

import { authActions } from 'redux/modules/auth';

import ServiceMenu from 'components/containers/ServiceMenuContainer';
import MenuPageTemplate from 'components/templates/MenuPageTemplate';
import Header from 'components/containers/Header';
import Unsubscribe from 'components/LV3/Unsubscribe';
import UnsubscribeCompleted from 'components/LV3/Unsubscribe/Completed';
import UnsubscribeFailed from 'components/LV3/Unsubscribe/Failed';
import LoadingPage from 'components/LV3/LoadingPage';
import { ErrorMessages } from 'variables';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
  },
  isLoading: boolean,
  isUnsubscribeTrying: boolean,
  isUnsubscribeSuccess: boolean,
  isUnsubscribeFailed: boolean,
};

class UnsubscribeContainer extends Component<PropTypes> {
  static renderCompleted() {
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="退会処理が完了しました"
        leftContent={<UnsubscribeCompleted />}
        rightContent={<div style={{ height: '400px' }} />}
      />
    );
  }

  constructor(props: PropTypes) {
    super(props);
    this.state = {
      reasonType: [],
      reasonText: '',
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps: PropTypes) {
    if (!this.isUnsubscribeSuccess && nextProps.isUnsubscribeSuccess) {
      setTimeout(() => {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
      }, 3000);
    }
  }

  onClickUnsubscribe: Function;
  unsubscribe = () => {
    const { dispatch, user } = this.props;
    const { reasonType, reasonText } = this.state;

    window.scrollTo(0, 0);

    if (this.validate()) {
      dispatch(
        authActions.unsubscribe({
          userId: user.ID,
          reason: (reasonType || []).join(','),
          description: reasonText,
        }),
      );
      return;
    }

    const errors = {};
    if (reasonType.length === 0) {
      errors.reasonType = [].concat(errors.reasonType, [ErrorMessages.PleaseSelect]);
    }

    this.setState({ errors });
  };

  handleChangeUI: Function;
  handleChangeUI = (propsName: string, value) => {
    const state = this.state;
    state[propsName] = value;
    this.setState(state);
  };

  validate: Function;
  validate = () => {
    const { reasonType } = this.state;

    return reasonType && reasonType.length > 0;
  };

  renderFailed: Function;
  renderFailed = () => {
    const { user } = this.props;
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="退会処理が完了できませんでした"
        leftContent={<UnsubscribeFailed userId={user.ID} />}
        rightContent={<ServiceMenu />}
      />
    );
  };

  render() {
    const {
      isLoading,
      isUnsubscribeTrying,
      isUnsubscribeSuccess,
      isUnsubscribeFailed,
    } = this.props;

    if (isLoading) {
      return <LoadingPage />;
    }

    if (isUnsubscribeSuccess) return UnsubscribeContainer.renderCompleted();
    if (isUnsubscribeFailed) return UnsubscribeContainer.renderFailed();

    const { reasonType, reasonText, errors } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="退会の理由"
        caption="モノオクをご利用頂き、ありがとうございました。サービス改善の為にアンケートにご協力ください。"
        leftContent={
          <Unsubscribe
            reasonType={reasonType}
            onChangeReasonType={v => this.handleChangeUI('reasonType', v)}
            reasonTypeError={errors.reasonType}
            reasonText={reasonText}
            onChangeReasonText={v => this.handleChangeUI('reasonText', v)}
            onClickUnsubscribe={this.unsubscribe}
            buttonLoading={isUnsubscribeTrying}
          />
        }
        rightContent={<ServiceMenu />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user || {},
  isLoading: state.user.isLoading,
  isUnsubscribeTrying: state.auth.isUnsubscribeTrying,
  isUnsubscribeSuccess: state.auth.isUnsubscribeSuccess,
  isUnsubscribeFailed: state.auth.isUnsubscribeFailed,
});

export default authRequired(connect(mapStateToProps)(UnsubscribeContainer));

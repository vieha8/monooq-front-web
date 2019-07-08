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
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

type PropTypes = {
  dispatch: Function,
  user: {
    id: number,
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
      error: {},
    };
  }

  componentDidMount() {
    this.handleChangeUI('reasonType', '');
  }

  componentWillReceiveProps(nextProps: PropTypes) {
    if (!this.isUnsubscribeSuccess && nextProps.isUnsubscribeSuccess) {
      setTimeout(() => {
        const { dispatch } = this.props;
        dispatch(authActions.logout());
      }, 3000);
    }
  }

  onKeyDownUnsubscribe = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.unsubscribe();
    }
  };

  unsubscribe = () => {
    const { dispatch } = this.props;
    const { reasonType, reasonText } = this.state;

    window.scrollTo(0, 0);

    dispatch(
      authActions.unsubscribe({
        reason: (reasonType || []).join(','),
        description: reasonText,
      }),
    );
  };

  handleChangeUI = (propName: string, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'reasonType':
        if (value === undefined ? true : value.length === 0) {
          errors.push(ErrorMessages.PleaseSelect);
        }
        break;
      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { reasonType } = this.state;

    return reasonType && reasonType.length > 0;
  };

  renderFailed = () => {
    const { user } = this.props;
    return (
      <MenuPageTemplate
        header={<Header />}
        headline="退会処理が完了できませんでした"
        leftContent={<UnsubscribeFailed userId={user.id} />}
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

    const { reasonType, reasonText, error } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline="退会の理由"
        caption="モノオクをご利用頂き、ありがとうございました。サービス改善の為にアンケートにご協力ください。"
        leftContent={
          <Unsubscribe
            reasonType={reasonType}
            onChangeReasonType={v => this.handleChangeUI('reasonType', v)}
            reasonTypeError={error.reasonType}
            reasonText={reasonText}
            onChangeReasonText={v => this.handleChangeUI('reasonText', v)}
            onClickUnsubscribe={this.unsubscribe}
            onKeyDownUnsubscribe={this.onKeyDownUnsubscribe}
            buttonLoading={isUnsubscribeTrying}
            buttonDisabled={!this.validate()}
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

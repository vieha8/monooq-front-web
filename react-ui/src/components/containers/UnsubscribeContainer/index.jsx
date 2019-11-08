import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { authActions } from 'redux/modules/auth';

import ContentPageMenu from 'components/hocs/ContentPageMenu';
import Unsubscribe from 'components/LV3/Unsubscribe';
import UnsubscribeCompleted from 'components/LV3/Unsubscribe/Completed';
import UnsubscribeFailed from 'components/LV3/Unsubscribe/Failed';
import LoadingPage from 'components/LV3/LoadingPage';
import { H1 } from 'components/LV1/Texts/Headline';
import { ErrorMessages, Dimens } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';

import { connect } from 'react-redux';
import authRequired from 'components/containers/AuthRequired';

const Caption = styled.div`
  margin: ${Dimens.medium_20}px 0;
`;

const UnsubscribeCompletedWrap = styled.div`
  width: 100%;
`;

class UnsubscribeContainer extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(authActions.initUnsubscribe());
    this.state = {
      reasonType: [],
      reasonText: '',
      error: {},
    };
  }

  componentDidMount() {
    this.handleChangeUI('reasonType', '');
  }

  componentWillReceiveProps(nextProps) {
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

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'reasonType':
        if (!value || value.length === 0) {
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

  render() {
    const {
      isLoading,
      isUnsubscribeSuccess,
      isUnsubscribeFailed,
      user,
      isUnsubscribeTrying,
    } = this.props;
    const { reasonText, error } = this.state;

    if (isLoading) {
      return <LoadingPage />;
    }

    if (isUnsubscribeSuccess) {
      return (
        <UnsubscribeCompletedWrap>
          <H1 bold>退会処理が完了しました</H1>
          <UnsubscribeCompleted />
        </UnsubscribeCompletedWrap>
      );
    }

    if (isUnsubscribeFailed) {
      return (
        <Fragment>
          <H1 bold>退会処理が完了できませんでした</H1>
          <UnsubscribeFailed userId={user.id} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <H1 bold>退会の理由</H1>
        <Caption>
          モノオクをご利用頂き、ありがとうございました。サービス改善の為にアンケートにご協力ください。
        </Caption>
        <Unsubscribe
          onChangeReasonType={v => this.handleChangeUI('reasonType', v)}
          reasonTypeError={error.reasonType}
          reasonText={reasonText}
          onChangeReasonText={v => this.handleChangeUI('reasonText', v)}
          onClickUnsubscribe={this.unsubscribe}
          onKeyDownUnsubscribe={this.onKeyDownUnsubscribe}
          buttonLoading={isUnsubscribeTrying}
          buttonDisabled={!this.validate()}
        />
      </Fragment>
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

export default authRequired(ContentPageMenu(connect(mapStateToProps)(UnsubscribeContainer), {}));

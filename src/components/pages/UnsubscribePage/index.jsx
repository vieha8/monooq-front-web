import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ErrorMessages } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { authActions } from 'redux/modules/auth';
import BaseTemplate from 'components/templates/BaseTemplate';
import withAuthRequire from 'components/hooks/withAuthRequire';
import Unsubscribe from 'components/LV3/Unsubscribe';
import UnsubscribeCompleted from 'components/LV3/Unsubscribe/Completed';
import UnsubscribeFailed from 'components/LV3/Unsubscribe/Failed';
import LoadingPage from 'components/LV3/LoadingPage';

class UnsubscribePage extends Component {
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

  componentDidUpdate(prevProps) {
    if (!prevProps.isUnsubscribeSuccess && this.props.isUnsubscribeSuccess) {
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
        <BaseTemplate>
          <UnsubscribeCompleted />
        </BaseTemplate>
      );
    }

    if (isUnsubscribeFailed) {
      return (
        <BaseTemplate>
          <UnsubscribeFailed userId={user.id} />
        </BaseTemplate>
      );
    }

    return (
      <BaseTemplate>
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
      </BaseTemplate>
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

export default withAuthRequire(connect(mapStateToProps)(UnsubscribePage), {});

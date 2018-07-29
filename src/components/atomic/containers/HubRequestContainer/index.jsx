// @flow

import React, { Component } from 'react';

import { userActions } from 'redux/modules/user';

import MenuPageTemplate from 'components/atomic/templates/MenuPageTemplate';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import HubRequest from 'components/atomic/LV3/HubRequest';
import HubRequestCompleted from 'components/atomic/LV3/HubRequest/Completed';
import { ErrorMessage } from 'strings';

import { checkLogin, checkAuthState, mergeAuthProps } from '../AuthRequired';
import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
  },
  isLoading: boolean,
  updateSuccess: boolean,
};

class HubRequestContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.ID && nextProps.user.ID) {
      const { user } = nextProps;
      this.setState({
        imageUri: user.ImageUrl,
        name: user.Name,
        email: user.Email,
        prefCode: user.PrefCode,
        profile: user.Profile,
      });
    }
  }

  onFocusChangeDatePicker: Function;
  onFocusChangeDatePicker = (name, focus) => {
    const { state } = this;
    state[name] = focus;
    this.setState(state);
  };

  onDateChange: Function;
  onDateChange = (name, date) => {
    const { state } = this;
    state[name] = date;
    this.setState({
      ...state,
      dateFocus: null,
    });
  };

  onClickButton: Function;
  onClickButton = () => {
    const { user } = this.props;
    const { name, email, prefCode, profile } = this.state;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      const { dispatch } = this.props;
      dispatch(userActions.updateUser({ userId: user.ID, body: this.state }));
      return;
    }

    const errors = {};
    // 名前チェック
    if (!name) {
      errors.name = [].concat(errors.name, [ErrorMessage.PleaseInput]);
    }
    // emailチェック
    if (!email) {
      errors.email = [].concat(errors.email, [ErrorMessage.PleaseInput]);
    }
    // お住いの地域選択
    if (!prefCode) {
      errors.email = [].concat(errors.prefCode, [ErrorMessage.PleaseSelect]);
    }
    // プロフィールチェック
    if (!profile) {
      errors.profile = [].concat(errors.profile, [ErrorMessage.PleaseInput]);
    }

    this.setState({ errors });
  };

  handleChangeUI: Function;
  handleChangeUI = (propsName: string, value) => {
    const { state } = this;
    state[propsName] = value;
    this.setState(state);
  };

  validate: Function;
  validate = () => {
    const {
      startDate,
      endDate,
      baggageSize,
      baggageInfo,
      cargoDate,
      cargoTime,
      address,
      tel,
    } = this.state;
    return (
      startDate && endDate && baggageSize && baggageInfo && cargoDate && cargoTime && address && tel
    );
  };

  render() {
    const auth = checkAuthState(this.props);
    if (auth) {
      return auth;
    }

    const { updateSuccess, isChecking, isLoading, user } = this.props;

    if (isChecking) {
      return <LoadingPage />;
    }

    const {
      startDate,
      endDate,
      startDateFocus,
      endDateFocus,
      baggageSize,
      baggageInfo,
      cargoDate,
      cargoDateFocus,
      cargoTime,
      address,
      tel,
    } = this.state;

    return (
      <MenuPageTemplate
        header={<Header />}
        headline={updateSuccess ? 'プロフィールの更新が完了しました' : 'モノオクハブお申込み'}
        rightContent={
          updateSuccess ? (
            <HubRequestCompleted userId={user.ID} />
          ) : (
            <HubRequest
              schedule={{
                beginDate: startDate,
                beginDateFocused: startDateFocus,
                onFocusChangeBegin: focus => this.onFocusChangeDatePicker('startDateFocus', focus),
                onDateChangeBegin: date => this.onDateChange('startDate', date),
                endDate,
                endDateFocused: endDateFocus,
                onFocusChangeEnd: focus => this.onFocusChangeDatePicker('endDateFocus', focus),
                onDateChangeEnd: date => this.onDateChange('endDate', date),
              }}
              baggageSize={baggageSize}
              onChangeBaggageSize={value => this.handleChangeUI('baggageSize', value)}
              baggageInfo={baggageInfo}
              onChangeBaggageInfo={value => this.handleChangeUI('baggageInfo', value)}
              cargoDate={cargoDate}
              cargoDateFocused={cargoDateFocus}
              onFocusChangeCargo={focus => this.onFocusChangeDatePicker('cargoDateFocus', focus)}
              onDateChangeCargo={date => this.onDateChange('cargoDate', date)}
              cargoTime={cargoTime}
              onChangeCargoTime={value => this.handleChangeUI('cargoTime', value)}
              address={address}
              onChangeAddress={value => this.handleChangeUI('address', value)}
              tel={tel}
              onChangeTel={value => this.handleChangeUI('tel', value)}
              buttonDisabled={!this.validate()}
              buttonLoading={isLoading}
              onClickButton={this.onClickButton}
            />
          )
        }
        footer={<Footer />}
      />
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    user: state.auth.user || {},
    updateSuccess: state.user.updateSuccess,
    isLoading: state.user.isLoading,
  });

export default connect(
  HubRequestContainer,
  mapStateToProps,
);

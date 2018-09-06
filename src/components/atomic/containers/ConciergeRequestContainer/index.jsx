// @flow

import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { requestActions } from 'redux/modules/request';
import { checkLogin, mergeAuthProps } from 'components/atomic/containers/AuthRequired';
import connect from 'components/atomic/containers/connect';
import Header from 'components/atomic/containers/Header';
import Footer from 'components/atomic/LV2/Footer';
import ConciergeRequest from 'components/atomic/LV3/ConciergeRequest';

type PropTypes = {
  dispatch: Function,
  user: {
    ID: number,
    Email: string,
  },
};

class ConciergeRequestContainer extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    checkLogin(this.props);

    this.state = {
      baggageSize: '約1畳',
      cargoTime: '9時〜12時',
      notes: '',
      hasChanged: false,
      email: props.user.Email || '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user.ID && nextProps.user.ID) {
      const user = nextProps.user;
      this.setState({
        imageUri: user.ImageUrl,
        name: user.Name,
        email: user.Email,
        prefCode: user.PrefCode,
        profile: user.Profile,
      });
    }
  }

  onFocusChangeDatePicker = (name, focus) => {
    const { state } = this;
    state[name] = focus;
    this.setState(state);
  };

  onDateChange = (name, date) => {
    const { state } = this;
    state[name] = date;
    this.setState({
      ...state,
      dateFocus: null,
    });
  };

  onClickButton = () => {
    const { user } = this.props;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      this.props.dispatch(
        requestActions.sendConciergeRequest({ userId: user.ID, body: this.state }),
      );
    }

    this.setState({ hasChanged: true });
    window.scrollTo(0, 0);
  };

  close = () => this.setState({ hasChanged: false });

  handleChangeUI = (propsName: string, value) => {
    const { state } = this;
    state[propsName] = value;
    this.setState(state);
  };

  validate = () => {
    const { startDate, endDate, baggageSize, baggageInfo, address, budget, email } = this.state;
    return startDate && endDate && baggageSize && baggageInfo && address && budget && email;
  };

  render() {
    const {
      startDate,
      endDate,
      startDateFocus,
      endDateFocus,
      baggageSize,
      baggageInfo,
      address,
      budget,
      notes,
      hasChanged,
      email,
    } = this.state;

    return (
      <Fragment>
        <Header />
        <ConciergeRequest
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
          onChangeCargoTime={value => this.handleChangeUI('cargoTime', value)}
          address={address}
          onChangeAddress={value => this.handleChangeUI('address', value)}
          notes={notes}
          onChangeNotes={value => this.handleChangeUI('notes', value)}
          budget={budget}
          onChangeBudget={value => this.handleChangeUI('budget', value)}
          email={email}
          onChangeEmail={value => this.handleChangeUI('email', value)}
          buttonDisabled={!this.validate()}
          onClickButton={this.onClickButton}
        />
        <Footer />
        <Modal size="large" open={hasChanged} onClose={this.close}>
          <Modal.Header>Thanks!</Modal.Header>
          <Modal.Content>
            <p>
              モノオクコンシェルジュのお申し込みありがとうございます。
              <br />
              <br />
              翌営業日以内にメールにてご連絡させていただきますので、しばしお待ちください。
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button small={1} onClick={this.close}>
              閉じる
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state =>
  mergeAuthProps(state, {
    user: state.auth.user || {},
  });

export default connect(
  ConciergeRequestContainer,
  mapStateToProps,
);

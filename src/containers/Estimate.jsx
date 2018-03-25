import React from 'react';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { requestActions } from 'redux/modules/request';
import { ErrorMessage } from 'strings';
import Estimate from 'components/Estimate';
import FormValidator from 'containers/helper/FormValidator';

const Validate = {
  Price: {
    Min: 3000,
  },
};

class EstimateContainer extends React.Component {
  constructor(props) {
    super(props);

    FormValidator.initialize('estimate', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
  }

  onDateChange = (name, date) => {
    const { dispatch } = this.props;
    FormValidator.changeUiState(name, date, this.props.ui);
    dispatch(uiActions.setUiState({ dateFocus: null }));
  }

  onFocusChangeDatePicker = (name, focus) => {
    const { dispatch } = this.props;
    const focusState = {};
    focusState[name] = focus;
    dispatch(uiActions.setUiState({
      dateFocus: focusState,
    }));
  }

  handleChangePrice = (value) => {
    const prop = 'price';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (parseInt(value, 10) < Validate.Price.Min) {
      errors.push(ErrorMessage.EstimateMin(Validate.Price.Min));
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  sendRequest = () => {
    const userId = this.props.user.ID;
    const roomId = this.props.match.params.message_room_id;
    const { begin, end, price } = this.props.ui.estimate;
    this.props.dispatch(requestActions.estimate({
      userId, roomId, startDate: begin.toDate(), endDate: end.toDate(), price,
    }));
  }

  validate = () => {
    const { ui } = this.props;
    const estimate = ui.estimate || {};

    return (
      estimate.begin
      && estimate.end
      && estimate.begin.diff(estimate.end, 'hours') < 24
      && estimate.price !== ''
      && estimate.price >= Validate.Price.Min
    );
  }

  render() {
    const { ui, error } = this.props;
    const dateFocus = ui.dateFocus || {};
    const estimate = ui.estimate || {};

    return (
      <Estimate
        onDateChange={this.onDateChange}
        beginDate={estimate.begin}
        endDate={estimate.end}
        beginDateFocused={dateFocus.begin}
        endDateFocused={dateFocus.end}
        onFocusChangeDatePicker={this.onFocusChangeDatePicker}
        price={ui.price}
        handleChangePrice={this.handleChangePrice}
        priceErrors={error.errors.price}
        buttonDisabled={!this.validate()}
        buttonLoading={this.props.isSending}
        onClickButton={this.sendRequest}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
  error: state.error,
  isSending: state.request.estimate.isSending,
});

export default connect(mapStateToProps)(EstimateContainer);

import React from 'react';
import { connect } from 'react-redux';
import { uiActions } from 'redux/modules/ui';
import { requestActions } from 'redux/modules/request';
import Estimate from 'components/Estimate';

class EstimateContainer extends React.Component {
  handleChange = ({ target }) => {
    this.props.dispatch(uiActions.setUiState({
      [target.name]: target.value,
    }));
  };

  sendRequest = () => {
    const userId = this.props.user.ID;
    const roomId = this.props.match.params.message_room_id;
    const { startDate, endDate, price } = this.props.ui;
    this.props.dispatch(requestActions.estimate({
      userId, roomId, startDate, endDate, price,
    }));
  };

  onDateChange = (name, date) => {
    const { dispatch, ui } = this.props;
    const duration = Object.assign({}, ui.duration);
    duration[name] = date;
    dispatch(uiActions.setUiState({ duration, dateFocus: null }));
  }

  onFocusChangeDatePicker = (name, focus) => {
    const { dispatch } = this.props;
    const focusState = {};
    focusState[name] = focus;
    dispatch(uiActions.setUiState({
      dateFocus: focusState,
    }));
  }

  render() {
    const { ui } = this.props;
    const dateFocus = ui.dateFocus || {};
    const duration = ui.duration || {};

    return (
      <Estimate
        onDateChange={this.onDateChange}
        beginDate={duration.begin}
        endDate={duration.end}
        beginDateFocused={dateFocus.begin}
        endDateFocused={dateFocus.end}
        onFocusChangeDatePicker={this.onFocusChangeDatePicker}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
});

export default connect(mapStateToProps)(EstimateContainer);

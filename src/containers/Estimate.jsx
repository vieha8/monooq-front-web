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

  render() {
    return (
      <Estimate />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
});

export default connect(mapStateToProps)(EstimateContainer);

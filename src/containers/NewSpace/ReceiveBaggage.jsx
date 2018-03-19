import React from 'react';
import { authConnect } from "../../components/Auth";
import { Page } from 'components/NewSpace/page/Shared';
import ReceiveBaggage from 'components/NewSpace/page/ReceiveBaggage';
import {uiActions} from "../../redux/modules/ui";

class ReceiveBaggageContainer extends React.Component {

  handleChangeText = ({target}) => {
    const {space} = this.props.ui;
    Object.assign(space, {[target.name]: target.value});
    this.props.dispatch(uiActions.setUiState({space}));
  };

  handleChangeSelect = (_, target) => {
    this.handleChangeText({target});
  };

  render() {
    return (
      <Page>
        <ReceiveBaggage
          {...this.props}
          handleChangeText={this.handleChangeText}
          handleChangeSelect={this.handleChangeSelect}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default authConnect(mapStateToProps)(ReceiveBaggageContainer);
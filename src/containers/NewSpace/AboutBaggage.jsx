import React from 'react';
import { Page } from 'components/NewSpace/page/Shared';
import AboutBaggage from 'components/NewSpace/page/AboutBaggage';
import {connect} from "react-redux";
import {uiActions} from "../../redux/modules/ui";

class AboutBaggageContainer extends React.Component {

  handleChangeText = ({target}) => {
    const {space} = this.props.ui;
    Object.assign(space, {[target.name]: target.value});
    this.props.dispatch(uiActions.setUiState({space}));
  };

  handleChangeCheckbox = (_, target) => {
    target.value = target.checked;
    this.handleChangeText({target});
  };

  render() {
    return (
      <Page>
        <AboutBaggage
          {...this.props}
          handleChangeText={this.handleChangeText}
          handleChangeCheckbox={this.handleChangeCheckbox}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(AboutBaggageContainer);

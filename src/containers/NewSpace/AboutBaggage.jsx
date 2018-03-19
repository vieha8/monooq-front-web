import React from 'react';
import{ authConnect } from "../../components/Auth";
import { Page } from 'components/NewSpace/page/Shared';
import AboutBaggage from 'components/NewSpace/page/AboutBaggage';
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

export default authConnect(mapStateToProps)(AboutBaggageContainer);

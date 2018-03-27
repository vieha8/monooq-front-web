import React from 'react';
import { Redirect } from 'react-router-dom';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import AboutBaggage from 'components/NewSpace/page/AboutBaggage';
import { ErrorMessage } from 'strings';
import Path from 'config/path';
import FormValidator from 'containers/helper/FormValidator';
import { init, mapStateToProps } from './common';

class AboutBaggageContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
  }

  onClickNext = () => {
    const { ui, history } = this.props;
    if (ui.isEdit) {
      history.push(Path.editSpaceReceive(ui.spaceId));
    } else {
      history.push(Path.createSpaceReceive());
    }
  }

  onClickBack = () => {
    const { ui, history } = this.props;
    if (ui.isEdit) {
      history.push(Path.editSpaceInfo(ui.spaceId));
    } else {
      history.push(Path.createSpaceInfo());
    }
  }

  handleChangeAbout = (value) => {
    const prop = 'about';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }

    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeType = (checked) => {
    FormValidator.changeUiState('isFurniture', checked, this.props.ui);
  }

  validate = () => {
    const { ui } = this.props;
    const space = ui.space;
    if (space.about && space.about.length > 0) {
      return true;
    }

    return false;
  }

  render() {
    const { ui } = this.props;

    if (!ui.space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <Page>
        <AboutBaggage
          {...this.props}
          buttonDisabled={!this.validate()}
          handleChangeAbout={this.handleChangeAbout}
          handleChangeType={this.handleChangeType}
          onClickNext={this.onClickNext}
          onClickBack={this.onClickBack}
        />
      </Page>
    );
  }
}

export default authConnect(mapStateToProps)(AboutBaggageContainer);

import React from 'react';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import ReceiveBaggage from 'components/NewSpace/page/ReceiveBaggage';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';
import { init, mapStateToProps } from './common';

class ReceiveBaggageContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
  }

  onClickNext = () => {
    const { ui, history } = this.props;
    if (ui.isEdit) {
      history.push(Path.editSpaceAreaSize(ui.spaceId));
    } else {
      history.push(Path.createSpaceAreaSize());
    }
  }

  onClickBack = () => {
    const { ui, history } = this.props;
    if (ui.isEdit) {
      history.push(Path.editSpaceBaggage(ui.spaceId));
    } else {
      history.push(Path.createSpaceBaggage());
    }
  }

  handleChangeReceiptType = (value) => {
    const prop = 'receiptType';
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeReceiptAbout = (value) => {
    const prop = 'receiptAbout';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  validate = () => {
    const { ui } = this.props;
    return (
      ui.space.receiptType > 0
      && ui.space.receiptAbout && ui.space.receiptAbout.length > 0
    );
  }

  render() {
    const { ui } = this.props;

    if (!ui.space.title) {
      return <Redirect to={Path.createSpaceInfo()} />;
    }

    return (
      <Page>
        <ReceiveBaggage
          {...this.props}
          handleChangeReceiptType={this.handleChangeReceiptType}
          handleChangeReceiptAbout={this.handleChangeReceiptAbout}
          onClickNext={this.onClickNext}
          onClickBack={this.onClickBack}
          buttonDisabled={!this.validate()}
        />
      </Page>
    );
  }
}

export default authConnect(mapStateToProps)(ReceiveBaggageContainer);

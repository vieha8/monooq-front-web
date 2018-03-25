import React from 'react';
import Path from 'config/path';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import ReceiveBaggage from 'components/NewSpace/page/ReceiveBaggage';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { spaceActions } from 'redux/modules/space';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';

class ReceiveBaggageContainer extends React.Component {
  constructor(props) {
    super(props);
    if (!(props.space.space || {}).ID && props.match.params.space_id) {
      const spaceId = parseInt(props.match.params.space_id, 10);
      this.props.dispatch(uiActions.setUiState({
        spaceId,
        isEdit: true,
      }));
      this.props.dispatch(spaceActions.fetchSpace({ spaceId }));
    }

    FormValidator.initialize('space', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
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

const mapStateToProps = (state) => {
  if (!state.ui.space.id && state.space.space) {
    const { space } = state.space;
    state.ui.space = {
      id: space.ID,
      title: space.Title,
      type: space.Type,
      introduction: space.Introduction,
      address: space.Address,
      images: space.Images,
      about: space.About,
      isFurniture: space.IsFurniture,
      receiptType: space.ReceiptType,
      receiptAbout: space.ReceiptAbout,
      sizeType: space.SizeType,
      priceFull: space.PriceFull,
      priceHalf: space.PriceHalf,
      priceQuarter: space.PriceQuarter,
    };
  }
  return ({
    ui: state.ui,
    error: state.error,
  });
};

export default authConnect(mapStateToProps)(ReceiveBaggageContainer);

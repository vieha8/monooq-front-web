import React from 'react';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import AboutBaggage from 'components/NewSpace/page/AboutBaggage';
import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';
import { errorActions } from 'redux/modules/error';
import { ErrorMessage } from 'strings';
import Path from 'config/path';

class AboutBaggageContainer extends React.Component {
  constructor(props) {
    super(props);
    if (props.match.params.space_id) {
      const spaceId = parseInt(props.match.params.space_id, 10);
      this.props.dispatch(uiActions.setUiState({
        spaceId,
        isEdit: true,
      }));
      this.props.dispatch(spaceActions.fetchSpace({ spaceId }));
    }
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

    this.changeErrorState(prop, errors);
    this.changeUiState(prop, value);
  }

  handleChangeType = (checked) => {
    this.changeUiState('isFurniture', checked ? '1' : '0');
  }

  changeUiState = (propName, value) => {
    const { dispatch, ui } = this.props;
    const nextSpace = Object.assign({}, ui.space);
    nextSpace[propName] = value;
    dispatch(uiActions.setUiState({ space: nextSpace }));
  }

  changeErrorState = (propName, propErrors) => {
    const { dispatch, error } = this.props;
    const nextErrors = Object.assign({}, error.errors);
    nextErrors[propName] = propErrors;
    dispatch(errorActions.setErrorState({ errors: nextErrors }));
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
      priceQuarter: space.Quarter,
    };
  }
  return ({
    ui: state.ui,
    error: state.error,
  });
};

export default authConnect(mapStateToProps)(AboutBaggageContainer);

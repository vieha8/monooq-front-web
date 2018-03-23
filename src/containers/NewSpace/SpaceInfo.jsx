import React from 'react';
import Path from 'config/path';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceInfo from 'components/NewSpace/page/SpaceInfo';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { spaceActions } from 'redux/modules/space';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';

class SpaceInfoContainer extends React.Component {
  constructor(props) {
    super(props);

    if (props.match.params.space_id) {
      const spaceId = parseInt(props.match.params.space_id, 10);
      this.props.dispatch(uiActions.setUiState({
        spaceId,
        isEdit: true,
      }));
      this.props.dispatch(spaceActions.fetchSpace({ spaceId, isSelfOnly: true }));
    }

    this.props.dispatch(uiActions.setUiState({
      buttonDisabled: true,
    }));

    FormValidator.initialize('space', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
  }

  onClickImageDelete = (deleteTargetIndex) => {
    const { ui, dispatch } = this.props;
    const { space } = ui;
    const nextImages = Object.assign([], space.images);
    nextImages.splice(deleteTargetIndex, 1);
    Object.assign(space, { images: nextImages });
    dispatch(uiActions.setUiState({ space }));
  }

  onClickNext = () => {
    const { history, ui } = this.props;
    if (ui.isEdit) {
      history.push(Path.editSpaceBaggage(ui.spaceId));
    } else {
      history.push(Path.createSpaceBaggage());
    }
  };

  handleChangeTitle = (value) => {
    const prop = 'title';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  };

  handleChangeSpaceType = (value) => {
    const prop = 'type';
    const errors = this.props.error[prop] || [];
    if (value === 0) {
      errors.push(ErrorMessage.PleaseSelect);
    }
    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  };

  handleChangeIntroduction = (value) => {
    const prop = 'introduction';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeAddress = (value) => {
    const prop = 'address';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangeImage = (accepted) => {
    const { space } = this.props.ui;
    if ((space.images || []).length + accepted.length > 4) {
      return;
    }
    Object.assign(space, { images: [...space.images, ...accepted] });
    this.props.dispatch(uiActions.setUiState({ space }));
  };

  validate = () => {
    const { ui } = this.props;
    const space = ui.space;
    if (space.title && space.title.length > 0
      && space.type > 0
      && space.introduction && space.introduction.length > 0
      && space.address && space.address.length > 0) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Page>
        <SpaceInfo
          {...this.props}
          buttonDisabled={!this.validate()}
          handleChangeTitle={this.handleChangeTitle}
          handleChangeSpaceType={this.handleChangeSpaceType}
          handleChangeIntroduction={this.handleChangeIntroduction}
          handleChangeAddress={this.handleChangeAddress}
          handleChangeImage={this.handleChangeImage}
          onClickImageDelete={this.onClickImageDelete}
          onClickNext={this.onClickNext}
        />
        {this.props.ui.space.id}
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

export default authConnect(mapStateToProps)(SpaceInfoContainer);

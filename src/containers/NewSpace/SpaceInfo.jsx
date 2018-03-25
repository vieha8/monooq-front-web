import React from 'react';
import Path from 'config/path';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceInfo from 'components/NewSpace/page/SpaceInfo';
import { uiActions } from 'redux/modules/ui';
import { ErrorMessage } from 'strings';
import FormValidator from 'containers/helper/FormValidator';
import { init, mapStateToProps } from "./common";

class SpaceInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
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
      </Page>
    );
  }
}

export default authConnect(mapStateToProps)(SpaceInfoContainer);

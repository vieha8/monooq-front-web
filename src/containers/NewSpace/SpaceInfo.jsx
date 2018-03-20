import React from 'react';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceInfo from 'components/NewSpace/page/SpaceInfo';
import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

class SpaceInfoContainer extends React.Component {
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

  onClickImageDelete = (deleteTargetIndex) => {
    const { ui, dispatch } = this.props;
    const { space } = ui;
    const nextImages = Object.assign([], space.images);
    nextImages.splice(deleteTargetIndex, 1);
    Object.assign(space, { images: nextImages });
    dispatch(uiActions.setUiState({ space }));
  }

  handleChangeTitle = (value) => {
    this.changeUiState('title', value);
  };

  handleChangeSpaceType = (value) => {
    this.changeUiState('type', value);
  };

  handleChangeIntroduction = (value) => {
    this.changeUiState('introduction', value);
  }

  handleChangeAddress = (value) => {
    this.changeUiState('address', value);
  }

  handleChangeImage = (accepted, rejected) => {
    if (rejected.length > 0) {
      console.error(rejected);
    }
    if (accepted.length > 4) {
      return;
    }
    const { space } = this.props.ui;
    Object.assign(space, { images: [...space.images, ...accepted] });
    this.props.dispatch(uiActions.setUiState({ space }));
  };

  changeUiState = (propName, value) => {
    const { dispatch, ui } = this.props;
    const nextSpace = Object.assign({}, ui.space);
    nextSpace[propName] = value;
    dispatch(uiActions.setUiState({
      space: nextSpace,
    }));
  }

  render() {
    return (
      <Page>
        <SpaceInfo
          {...this.props}
          handleChangeTitle={this.handleChangeTitle}
          handleChangeSpaceType={this.handleChangeSpaceType}
          handleChangeIntroduction={this.handleChangeIntroduction}
          handleChangeAddress={this.handleChangeAddress}
          handleChangeImage={this.handleChangeImage}
          onClickImageDelete={this.onClickImageDelete}
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
  });
};

export default authConnect(mapStateToProps)(SpaceInfoContainer);

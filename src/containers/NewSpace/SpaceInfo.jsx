import React from 'react';
import { authConnect } from "../../components/Auth";
import { Page } from 'components/NewSpace/page/Shared';
import SpaceInfo from 'components/NewSpace/page/SpaceInfo';
import {uiActions} from "../../redux/modules/ui";
import { spaceActions } from "../../redux/modules/space";

class SpaceInfoContainer extends React.Component {

  constructor(props){
    super(props);
    if(props.match.params.space_id){
      const spaceId = parseInt(props.match.params.space_id, 10);
      this.props.dispatch(uiActions.setUiState({
        spaceId,
        isEdit: true,
      }));
      this.props.dispatch(spaceActions.fetchSpace({spaceId}));
    }
  };

  handleChangeSelect = (_, target) => {
    this.handleChangeText({ target });
  };

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

  onClickImageDelete = (deleteTargetIndex) => {
    const { ui, dispatch } = this.props;
    const { space } = ui;
    const nextImages = Object.assign([], space.images);
    nextImages.splice(deleteTargetIndex, 1);
    Object.assign(space, { images: nextImages });
    dispatch(uiActions.setUiState({ space }));
  }

  render() {
    return (
      <Page>
        <SpaceInfo
          {...this.props}
          handleChangeText={this.handleChangeText}
          handleChangeSelect={this.handleChangeSelect}
          handleChangeImage={this.handleChangeImage}
          onClickImageDelete={this.onClickImageDelete}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => {
  if(!state.ui.space.id && state.space.space){
    const {space} = state.space;
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

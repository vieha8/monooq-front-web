import React from 'react';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import SpaceSize from 'components/NewSpace/page/SpaceSize';
import { uiActions } from 'redux/modules/ui';
import { spaceActions } from 'redux/modules/space';

class SpaceSizeContainer extends React.Component {
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
  }

  render() {
    return (
      <Page>
        <SpaceSize {...this.props} />
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
  });
};

export default authConnect(mapStateToProps)(SpaceSizeContainer);

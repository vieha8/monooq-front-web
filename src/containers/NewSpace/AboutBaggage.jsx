import React from 'react';
import{ authConnect } from "../../components/Auth";
import { Page } from 'components/NewSpace/page/Shared';
import AboutBaggage from 'components/NewSpace/page/AboutBaggage';
import {uiActions} from "../../redux/modules/ui";
import {spaceActions} from "../../redux/modules/space";

class AboutBaggageContainer extends React.Component {

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
  }

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

export default authConnect(mapStateToProps)(AboutBaggageContainer);

import React from 'react';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import AllUsePrice from 'components/NewSpace/page/AllUsePrice';
import AboutPrice from 'components/NewSpace/page/AboutPrice';
import { uiActions } from 'redux/modules/ui';
import { errorActions } from 'redux/modules/error';
import { spaceActions } from 'redux/modules/space';
import { ErrorMessage } from 'strings';
import Path from 'config/path';
import FormValidator from 'containers/helper/FormValidator';

const Validate = {
  Price: {
    Min: 3000,
  },
};

class PriceContainer extends React.Component {
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

    FormValidator.initialize('space', props.dispatch, uiActions.setUiState, errorActions.setErrorState);
  }

  onClickComplete = () => {
    const { space, spaceId } = this.props.ui;
    space.userId = this.props.user.ID;
    if (this.props.ui.isEdit) {
      this.props.dispatch(spaceActions.updateSpace({ spaceId, body: space }));
    } else {
      this.props.dispatch(spaceActions.createSpace({ body: space }));
    }
  }

  onClickBack = () => {
    const { ui, history } = this.props;
    if (ui.isEdit) {
      history.push(Path.editSpaceAreaSize(ui.spaceId));
    } else {
      history.push(Path.createSpaceAreaSize());
    }
  }

  handleChangeText = ({ target }) => {
    const { space } = this.props.ui;
    Object.assign(space, { [target.name]: parseInt(target.value, 10) });
    this.props.dispatch(uiActions.setUiState({ space }));
  };

  handleChangePriceAll = (value) => {
    const prop = 'priceFull';
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (parseInt(value, 10) < Validate.Price.Min) {
      errors.push(ErrorMessage.PriceMin(Validate.Price.Min))
    }
    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  validateAllUsePrice = () => {
    const { ui } = this.props;

    return (
      ui.space.priceFull !== ''
      && ui.space.priceFull >= Validate.Price.Min
    );
  }

  render() {
    return (
      <Page>
        {this.props.match.params.type === 'all' ?
          <AllUsePrice
            {...this.props}
            handleChangePriceAll={this.handleChangePriceAll}
            onClickComplete={this.onClickComplete}
            buttonDisabled={!this.validateAllUsePrice()}
          />
          :
          <AboutPrice
            {...this.props}
            handleChangeText={this.handleChangeText}
            onClickComplete={this.onClickComplete}
          />
        }
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
    user: state.auth.user,
    error: state.error,
  });
};

export default authConnect(mapStateToProps)(PriceContainer);

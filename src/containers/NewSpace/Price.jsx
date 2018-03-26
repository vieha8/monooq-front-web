import React from 'react';
import { authConnect } from 'components/Auth';
import { Page } from 'components/NewSpace/page/Shared';
import AllUsePrice from 'components/NewSpace/page/AllUsePrice';
import AboutPrice from 'components/NewSpace/page/AboutPrice';
import { spaceActions } from 'redux/modules/space';
import { ErrorMessage } from 'strings';
import Path from 'config/path';
import FormValidator from 'containers/helper/FormValidator';
import { init, mapStateToProps } from "./common";

const Validate = {
  Price: {
    Max: 300000,
    Min: 3000,
  },
};

class PriceContainer extends React.Component {
  constructor(props) {
    super(props);
    init(props);
  }

  onClickComplete = () => {
    const { match, ui } = this.props;
    const { space, spaceId } = ui;
    space.userId = this.props.user.ID;

    let saveSpace = space;
    if (match.params.type === 'all') {
      // 単一金額の場合は、Half/Quarterの金額を0円にする
      saveSpace = Object.assign(saveSpace, {
        priceHalf: 0,
        priceQuarter: 0,
      });
    }

    if (this.props.ui.isEdit) {
      this.props.dispatch(spaceActions.updateSpace({ spaceId, body: saveSpace }));
    } else {
      this.props.dispatch(spaceActions.createSpace({ body: saveSpace }));
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

  onChangePrice = (prop, value) => {
    const errors = this.props.error[prop] || [];
    if (value.length === 0) {
      errors.push(ErrorMessage.PleaseInput);
    }
    if (parseInt(value, 10) < Validate.Price.Min) {
      errors.push(ErrorMessage.PriceMin(Validate.Price.Min));
    }
    if (parseInt(value, 10) > Validate.Price.Max) {
      errors.push(ErrorMessage.PriceMax(Validate.Price.Max));
    }
    FormValidator.changeErrorState(prop, errors, this.props.error);
    FormValidator.changeUiState(prop, value, this.props.ui);
  }

  handleChangePriceAll = (value) => {
    this.onChangePrice('priceFull', value);
  }

  handleChangePriceFull = (value) => {
    this.onChangePrice('priceFull', value);
  }

  handleChangePriceHalf = (value) => {
    this.onChangePrice('priceHalf', value);
  }

  handleChangePriceQuarter = (value) => {
    this.onChangePrice('priceQuarter', value);
  }

  validateAllUsePrice = () => {
    const { ui } = this.props;

    return (
      ui.space.priceFull !== ''
      && ui.space.priceFull >= Validate.Price.Min
      && ui.space.priceFull <= Validate.Price.Max
    );
  }

  validateAboutPrice = () => {
    const { ui } = this.props;

    return (
      ui.space.priceFull !== ''
      && ui.space.priceFull >= Validate.Price.Min
      && ui.space.priceFull <= Validate.Price.Max
      && ui.space.priceHalf !== ''
      && ui.space.priceHalf >= Validate.Price.Min
      && ui.space.priceHalf <= Validate.Price.Max
      && ui.space.priceQuarter !== ''
      && ui.space.priceQuarter >= Validate.Price.Min
      && ui.space.priceQuarter <= Validate.Price.Max
    );
  }

  render() {
    return (
      <Page>
        {this.props.match.params.type === 'all' ?
          <AllUsePrice
            {...this.props}
            handleChangePriceAll={this.handleChangePriceAll}
            onClickBack={this.onClickBack}
            onClickComplete={this.onClickComplete}
            buttonDisabled={!this.validateAllUsePrice()}
            buttonLoading={this.props.isLoading}
          />
          :
          <AboutPrice
            {...this.props}
            handleChangeText={this.handleChangeText}
            onClickBack={this.onClickBack}
            onClickComplete={this.onClickComplete}
            handleChangePriceFull={this.handleChangePriceFull}
            handleChangePriceHalf={this.handleChangePriceHalf}
            handleChangePriceQuarter={this.handleChangePriceQuarter}
            buttonDisabled={!this.validateAboutPrice()}
            buttonLoading={this.props.isLoading}
          />
        }
      </Page>
    );
  }
}

export default authConnect(mapStateToProps)(PriceContainer);

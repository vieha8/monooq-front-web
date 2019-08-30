// @flow

import React, { Component } from 'react';
import Path from 'config/path';
import ReactGA from 'react-ga';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import SearchCondition from 'components/LV3/SearchCondition';
import { spaceActions } from 'redux/modules/space';
import { isAvailableLocalStorage } from 'helpers/storage';
import { ErrorMessages } from 'variables';
import { iskeyDownEnter, iskeyDownSpace } from 'helpers/keydown';
import connect from '../connect';

type PropTypes = {
  history: {
    push: Function,
  },
  space: {
    id: number,
  },
};

const ValidateRegExp = {
  PriceNumber: /^[0-9]*$/,
};

class SearchConditionContainer extends Component<PropTypes> {
  constructor(props) {
    super(props);

    if (isAvailableLocalStorage() && localStorage.getItem('searchCondition')) {
      const savedConditions = JSON.parse(localStorage.getItem('searchCondition'));
      const {
        keyword,
        prefCode,
        priceMin,
        priceMax,
        type,
        isFurniture,
        receiptType,
      } = savedConditions;
      this.state = {
        keyword: keyword || '',
        prefCode: prefCode || 0,
        priceMin: priceMin || '',
        priceMax: priceMax || '',
        type: type || 0,
        isFurniture,
        receiptType: receiptType || 0,
        error: {},
      };
    } else {
      this.state = {
        keyword: '',
        prefCode: 0,
        priceMin: '',
        priceMax: '',
        type: 0,
        isFurniture: false,
        receiptType: 0,
        error: {},
      };
    }
  }

  onKeyDownFurniture = e => {
    if (iskeyDownSpace(e)) {
      const { isFurniture } = this.state;
      this.handleChangeUI('isFurniture', !isFurniture);
    }
  };

  onKeyDownButtonSerch = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickSearch();
    }
  };

  onClickSearch = () => {
    const { history, dispatch } = this.props;
    dispatch(spaceActions.resetSearch());

    const { keyword, prefCode, priceMin, priceMax, type, isFurniture, receiptType } = this.state;
    const searchPath = Path.search();
    let query = `?keyword=${keyword}`;
    query += `&prefCode=${prefCode}`;
    query += `&priceMin=${priceMin}`;
    query += `&priceMax=${priceMax}`;
    query += `&type=${type}`;
    query += `&isFurniture=${isFurniture}`;
    query += `&receiptType=${receiptType}`;

    ReactGA.event({
      category: 'Search',
      action: 'Submit Condition Search Form',
      label: query,
    });

    if (isAvailableLocalStorage()) {
      const params = { keyword, prefCode, priceMin, priceMax, type, isFurniture, receiptType };
      localStorage.setItem('searchCondition', JSON.stringify(params));
    }

    history.push(`${searchPath}${query}`);
  };

  handleChangeUI = (propName: string, value: any) => {
    const { state } = this;
    const { error } = state;
    const errors = [];
    let returnValue = value;

    switch (propName) {
      case 'priceMin':
        if (value && value.length > 0) {
          if (!value.match(ValidateRegExp.PriceNumber)) {
            errors.push(ErrorMessages.PriceNumberName('最安料金'));
          } else {
            returnValue = Number(value);
          }
        }
        break;

      case 'priceMax':
        if (value && value.length > 0) {
          if (!value.match(ValidateRegExp.PriceNumber)) {
            errors.push(ErrorMessages.PriceNumberName('最高料金'));
          } else {
            returnValue = Number(value);
          }
        }
        break;

      default:
        break;
    }

    state[propName] = returnValue;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { priceMin, priceMax } = this.state;
    let isNoErr = true;
    if (priceMin && priceMin.length > 0) {
      if (!priceMin.match(ValidateRegExp.PriceNumber)) {
        isNoErr = false;
      }
    }
    if (priceMax && priceMax.length > 0) {
      if (!priceMax.match(ValidateRegExp.PriceNumber)) {
        isNoErr = false;
      }
    }

    return isNoErr;
  };

  render() {
    const {
      keyword,
      prefCode,
      priceMin,
      priceMax,
      type,
      isFurniture,
      receiptType,
      error,
    } = this.state;
    return (
      <SearchCondition
        errors={error}
        keyword={keyword}
        onChangeKeyword={v => this.handleChangeUI('keyword', v)}
        prefCode={prefCode}
        onChangePrefCode={v => this.handleChangeUI('prefCode', v)}
        priceMin={priceMin}
        onChangePriceMin={v => this.handleChangeUI('priceMin', v)}
        priceMax={priceMax}
        onChangePriceMax={v => this.handleChangeUI('priceMax', v)}
        type={type}
        onChangeType={v => this.handleChangeUI('type', v)}
        checkedFurniture={isFurniture}
        onClickFurniture={() => this.handleChangeUI('isFurniture', !isFurniture)}
        onKeyDownFurniture={this.onKeyDownFurniture}
        receive={receiptType}
        onChangeReceive={v => this.handleChangeUI('receiptType', v)}
        buttonDisabled={!this.validate()}
        onClickSearch={this.onClickSearch}
        onKeyDownButtonSerch={this.onKeyDownButtonSerch}
      />
    );
  }
}

export default ContentPageMenu(connect(SearchConditionContainer), {
  headline: 'スペース検索',
});

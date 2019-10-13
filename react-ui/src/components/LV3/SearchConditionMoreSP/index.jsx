// @flow

import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Modal } from 'semantic-ui-react';
import { Dimens, FontSizes, Colors } from 'variables';
import Hr from 'components/LV1/HorizontalRule';
import ButtonLV1 from 'components/LV1/Forms/Button';
import CloseIcon from 'components/LV2/ButtonHeader/CloseIcon';
// import CityTownAreaList from 'components/LV2/Lists/CityTownAreaList';
import SearchConditionCurrentList from 'components/LV2/Lists/SearchConditionCurrentList';
import SearchConditionSPList from 'components/LV2/Lists/SearchConditionSPList';

const CloseIconWrap = styled.div`
  display: none;
  ${media.tablet`
    display: block;
    margin-left: -2px;
    margin: ${Dimens.medium}px auto ${Dimens.medium1_25}px ${Dimens.medium}px;
  `};
`;

const SearchConditionWrap = styled.div`
  display: none;
  ${media.tablet`
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: auto ${Dimens.medium}px;
  `};
`;

const QuestionsContainer = styled.div`
  text-align: center;
`;

const QuestionRow = styled.div`
  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const Headline = styled.div`
  font-size: ${FontSizes.xxlarge}px;
  line-height: ${Dimens.medium2_38}px;
  font-weight: bold;
  margin-left: ${Dimens.medium}px;
  margin-bottom: ${Dimens.medium_20}px;
  text-align: left;
  ${media.phone`
    font-size: ${FontSizes.medium2}px;
    line-height: ${Dimens.medium1}px;
  `};
`;

type PropTypes = {
  btnText: string,
  // cityTownAreaList: Array<{
  //   cityName: string,
  //   areaAroundList: Array<{
  //     text: string,
  //     link: string,
  //   }>,
  //   townAreaList: Array<{
  //     text: string,
  //     link: string,
  //   }>,
  // }>,
  searchConditionCurrentList: Array<{
    title: string,
    value: string,
  }>,
  searchConditionSPList: Array<{
    title: string,
    collapsibleItemList: Array<{
      to: string,
      text: string,
    }>,
  }>,
};

// TODO: ★改修途中(このあとの実装で拡張予定なので、参考ソースはそのまま配置してある状態)★
class ButtonModalSearchConditionMore extends Component<PropTypes> {
  // state = { open: false };
  state = { open: true };

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false });

  render() {
    const {
      btnText,
      // cityTownAreaList,
      searchConditionCurrentList,
      searchConditionSPList,
    } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <ButtonLV1 secondary borderbold fontbold fill={1} onClick={this.open}>
          {btnText}
        </ButtonLV1>
        <Modal
          size="large"
          open={open}
          onClose={this.close}
          className="ButtonModalSearchConditionMore"
        >
          <Modal.Content scrolling>
            <CloseIconWrap>
              <CloseIcon onClick={this.close} />
            </CloseIconWrap>
            <SearchConditionWrap>
              <SearchConditionCurrentList searchConditionCurrentList={searchConditionCurrentList} />
            </SearchConditionWrap>
            <Hr margin="10px 0 20px" />
            <QuestionsContainer>
              <Headline>スペースを探す</Headline>
              <QuestionRow>
                <SearchConditionSPList searchConditionSPList={searchConditionSPList} />
              </QuestionRow>
            </QuestionsContainer>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default ButtonModalSearchConditionMore;

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import HowToUseListItem from 'components/LV2/Items/HowToUseListItem';

const ItemWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 ${Dimens.medium}px;
  &:after {
    content: '';
    position: absolute;
    bottom: -${Dimens.medium_20}px;
    width: 90%;
    height: 320px;
    background: ${Colors.lightGray1Bg};
  }
  &:last-child {
    margin: ${Dimens.medium4_50}px auto ${Dimens.large4_80}px;
  }
  &:nth-child(3):after {
    left: 0;
  }
  &:nth-child(4):after {
    right: 0;
  }
  ${media.desktop`
    display: block;
  `};
  ${media.tablet`
    padding: 0 ${Dimens.medium}px;
    &:last-child {
      margin: auto;
    }
    &:after {
      display: none;
    }
  `};
  ${media.phone`
    padding: 0;
  `};
`;

const HowToUseList = ({ howToUseList }) => (
  <Fragment>
    {howToUseList &&
      howToUseList.map((ListItem, i) => (
        <ItemWrap key={i.toString()}>
          {ListItem.map((item, j) => (
            <HowToUseListItem
              key={j.toString()}
              image={item.image}
              contentNo={item.contentNo}
              title={item.title}
              detail={item.detail}
            />
          ))}
        </ItemWrap>
      ))}
  </Fragment>
);

export default HowToUseList;

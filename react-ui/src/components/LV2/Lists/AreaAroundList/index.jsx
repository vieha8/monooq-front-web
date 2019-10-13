// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dimens, FontSizes, Colors } from 'variables';
import Button from 'components/LV1/Forms/Button';

const Wrap = styled.div``;

const Caption = styled.div`
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  line-height: normal;
  ${props =>
    props.captionColor &&
    `
      color: ${props.captionColor};    
  `};
`;

const AreaPinList = styled.ul`
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  padding: ${Dimens.small2}px ${Dimens.xxsmall}px ${Dimens.small2_15}px;
  ::-webkit-scrollbar-track {
    background-color: ${Colors.lightGray7};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${Colors.lightGray6};
  }
`;

const Item = styled.li`
  width: fit-content;
  position: relative;
  display: inline-block;
  font-size: ${FontSizes.small}px;
  line-height: normal;
  color: ${Colors.black2};
  &:not(:first-child) {
    margin-left: ${Dimens.small_11}px;
  }
`;

const LinkStyled = styled(Link)`
  line-height: ${Dimens.medium_20}px;
  color: ${Colors.lightGray3};
  &:hover {
    color: ${Colors.lightGray3};
    opacity: 0.8;
  }
`;

export type PropTypes = {
  caption: string,
  captionColor?: string,
  areaAroundList: Array<{
    text: string,
    link: string,
  }>,
};

export default ({ caption, captionColor, areaAroundList }: PropTypes) => (
  <Wrap>
    <Caption captionColor={captionColor}>{caption}</Caption>
    <AreaPinList>
      {areaAroundList.map((item, i) => (
        <Item key={i.toString()}>
          <LinkStyled to={item.link} color={Colors.lightGray3}>
            <Button quaternary circle height={30} fontSize={14} lineheight={6}>
              {item.text}
            </Button>
          </LinkStyled>
        </Item>
      ))}
    </AreaPinList>
  </Wrap>
);

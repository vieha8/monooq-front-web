import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Dimens, Colors } from 'variables';
import Path from 'config/path';
import { media, mediaMin } from 'helpers/style/media-query';
import SpaceManageListItem from 'components/LV2/Items/SpaceManageListItem';
import { H1 } from 'components/LV1/Texts/Headline';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;

const ListItem = styled.div`
  width: calc(50% - ${Dimens.small2}px);
  margin: ${Dimens.small2}px auto;
  padding: ${Dimens.medium1}px ${Dimens.medium1}px 0 ${Dimens.medium1}px;
  background-color: ${Colors.white};
  ${props =>
    props.AddSpace &&
    `
      position: relative;
      height: 270px;
      margin-left: 0;
      padding: 0;
      background-color: unset;
      border: 2px solid ${Colors.brandPrimary};
      border-style: dashed;
      color: ${Colors.brandPrimary};
    `};

  &:nth-child(2n) {
    margin-left: ${Dimens.medium1}px;
  }

  ${media.tablet`
    width: 100%;
    &:nth-child(2n) {
      margin-left: 0;
    }
  `};
`;

const LinkStyled = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  &:active {
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

const AddIcon = styled.span`
  position: absolute;
  top: calc(50% + ${Dimens.small_10}px);
  left: calc(50% - 95px);
  font-weight: bold;
  color: ${Colors.brandPrimary};
  &::before,
  &::after {
    display: block;
    content: '';
    position: absolute;
    top: calc(50% - 50px);
    left: 50%;
    width: ${Dimens.xxsmall}px;
    height: ${Dimens.medium1}px;
    background: ${Colors.brandPrimary};
  }
  &::after {
    transform: rotate(90deg);
  }
`;

export default ({ spaces }) => (
  <Fragment>
    <H1 bold>スペースの管理</H1>
    <Wrap>
      {spaces.map((space, i) => (
        <Fragment key={`manage_space_list_item_${i}`.toString()}>
          <ListItem index={i}>
            <SpaceManageListItem {...space} />
          </ListItem>
        </Fragment>
      ))}
      <ListItem AddSpace>
        <LinkStyled to={Path.spaceCreate1()}>
          <AddIcon>新しいスペースを登録する</AddIcon>
        </LinkStyled>
      </ListItem>
    </Wrap>
  </Fragment>
);

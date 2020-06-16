import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { Dimens, FontSizes, Colors } from 'variables';
import { convertSpaceImgUrl } from 'helpers/imgix';
import dummySpaceImage from 'images/img-dummy-space.png';

const STATUS_FULL = 'full';
const STATUS_CONSULTATION = 'consultation';
const STATUS_DRAFT = 'draft';
const getStatus = status => {
  let color = Colors.green;
  let text = '空室';
  if (status === STATUS_FULL) {
    color = Colors.brandPrimary;
    text = '満室';
  } else if (status === STATUS_CONSULTATION) {
    color = Colors.lightGray3;
    text = '要相談';
  } else if (status === STATUS_DRAFT) {
    color = Colors.lightGray3;
    text = '下書き';
  }
  return {
    color,
    text,
  };
};

const HoverHistoryRow = styled.div`
  display: flex;
  height: 48px;
  font-size: ${FontSizes.small_12}px;
  line-height: 17px;
  color: ${Colors.black};
  position: relative;
  box-sizing: content-box;
  cursor: pointer;

  :not(:first-child) {
    margin-top: ${Dimens.small}px;
  }
  :not(:last-child) {
    padding-bottom: 8px;
    border-bottom: solid 1px #f7f7f7;
  }
`;
const HoverHistoryRowImg = styled.img`
  height: 48px;
  width: 64px;
  margin-right: ${Dimens.small2}px;
  object-fit: cover;
`;
const HoverHistoryRowBody = styled.div`
  height: 34px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 212px;
  padding: ${Dimens.xsmall}px 0 0;
  display: -webkit-box;
  font-weight: bold;
  ${media.phone`
    width: 100%;
  `};
`;

const HoverHistoryRowLabel = styled.div`
  position: absolute;
  font-size: ${FontSizes.small_12}px;
  padding: 1.5px ${Dimens.xsmall}px;
  color: ${Colors.white};
  background-color: ${props => (props.bgColor ? props.bgColor : Colors.green)};
  border-radius: 2px;
`;

export default ({ spaces, onClick }) => (
  <Fragment>
    {spaces.map((space, i) => (
      <HoverHistoryRow key={i.toString()} onClick={() => onClick(space.id)}>
        <HoverHistoryRowImg
          src={
            space.images.length
              ? convertSpaceImgUrl(`${space.images[0].imageUrl}`, 'w=128&h=94&fit=crop')
              : dummySpaceImage
          }
        />
        <HoverHistoryRowLabel bgColor={getStatus(space.status).color}>
          {getStatus(space.status).text}
        </HoverHistoryRowLabel>
        <HoverHistoryRowBody>{space.title}</HoverHistoryRowBody>
      </HoverHistoryRow>
    ))}
  </Fragment>
);

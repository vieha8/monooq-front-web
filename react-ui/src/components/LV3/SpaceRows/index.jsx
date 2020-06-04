import React from 'react';
import styled from 'styled-components';

import dummySpaceImage from 'images/img-dummy-space.png';
import { FontSizes, Colors } from 'variables';

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

  :not(:first-child) {
    margin-top: 8px;
  }
  :not(:last-child) {
    padding-bottom: 8px;
    border-bottom: solid 1px #f7f7f7;
  }
`;
const HoverHistoryRowImg = styled.img`
  height: 48px;
  width: 64px;
  margin-right: 12px;
  object-fit: cover;
`;
const HoverHistoryRowBody = styled.div`
  height: 34px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 212px;
  padding: 6px 0 0;
  display: -webkit-box;
`;

const HoverHistoryRowLabel = styled.div`
  position: absolute;
  font-size: ${FontSizes.small_12}px;
  padding: 1.5px 6px;
  color: ${Colors.white};
  background-color: ${props => (props.bgColor ? props.bgColor : Colors.green)};
  border-radius: 2px;
`;

export default ({ spaces }) => (
  <>
    {spaces.map((space, i) => (
      <HoverHistoryRow key={i}>
        <HoverHistoryRowImg
          src={space.images.length ? space.images[0].imageUrl : dummySpaceImage}
        />
        <HoverHistoryRowLabel bgColor={getStatus(space.status).color}>
          {getStatus(space.status).text}
        </HoverHistoryRowLabel>
        <HoverHistoryRowBody>{space.title}</HoverHistoryRowBody>
      </HoverHistoryRow>
    ))}
  </>
);

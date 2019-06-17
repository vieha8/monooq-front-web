// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import InlineText from 'components/LV1/InlineText';
import ScheduleListItem, {
  type PropTypes as ScheduleListItemType,
} from 'components/LV2/ScheduleListItem';
import { Colors, Dimens, FontSizes } from 'variables';

const Row = styled.div`
  &:not(:first-child) {
    margin-top: ${Dimens.medium}px;
  }
`;

const ScheduleListWrap = styled.div`
  padding-bottom: ${Dimens.medium}px;
  ${props =>
    props.rented &&
    `
    border-top: 1px solid ${Colors.borderGray};
  `};
`;

const CaptionWrap = styled.div`
  margin: ${Dimens.medium1}px auto 0;
  ${media.phone`
    margin: ${Dimens.medium1}px auto;
  `};
`;

type PropTypes = {
  schedules: Array<ScheduleListItemType>,
  isHost: boolean,
};

export default (props: PropTypes) => (
  <ScheduleListWrap>
    <CaptionWrap>
      <InlineText.Base fontSize={`${FontSizes.medium_18}`} bold>
        {props.isHost ? '貸したスペース' : '借りたスペース'}
      </InlineText.Base>
    </CaptionWrap>
    {props.schedules.map((schedule, i) => (
      <Row key={`schedule_item_${i}`.toString()}>
        <ScheduleListItem {...schedule} />
      </Row>
    ))}
  </ScheduleListWrap>
);

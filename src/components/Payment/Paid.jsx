import React from 'react';
import styled from 'styled-components';
import { FontSizes, Colors } from 'variables';
import { media } from 'helpers/style/media-query';
import Button from 'components/Shared/Button';
import PaidTemplate from './PaidTemplate';
import SpaceInfo from './SpaceInfo';
import EstimateInfo from './EstimateInfo';

const H1 = styled.h1`
  font-size: ${FontSizes.xlarge}px;
  color: ${Colors.black};
  ${media.tablet`
    font-size: ${FontSizes.large}px;
  `}
`;

const Caption = styled.span`
  font-size: ${FontSizes.medium}px;
  line-height: 1.5;
`;

export default props => (
  <PaidTemplate
    title={<H1>お支払いが完了しました。</H1>}
    subtitle={<Caption>「{props.space.Title}」の予約とお支払いが完了しました。</Caption>}
    sideContent={(
      <div>
        <SpaceInfo {...props.space} />
        <EstimateInfo {...props.estimate} />
      </div>
    )}
    button={(
      <Button
        onClick={props.onClickButton}
      >
        ホストに連絡する
      </Button>
    )}
  />
);

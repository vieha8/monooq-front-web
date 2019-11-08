import React from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import TextLink from 'components/LV1/Texts/TextLink';
import { Dimens } from 'variables';
import { media } from 'helpers/style/media-query';

const Caption = styled.div`
  display: inline-block;
  text-align: center;
  margin-top: ${Dimens.small_10}px;
  margin-left: ${Dimens.medium1}px;
  ${media.phone`
    display: block;
    margin-left: 0;
  `};
`;

const ButtonWrap = styled.div`
  display: inline-block;
  min-width: 300px;
  ${media.phone`
    display: block;
    min-width: auto;
  `};
`;

export default ({ disabled, loading, onClick, onKeyDownButtonMessage }) => (
  <div>
    <ButtonWrap>
      <Button
        center
        primary
        fontbold
        fill={1}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        onKeyDown={onKeyDownButtonMessage}
      >
        このホストに相談する
      </Button>
    </ButtonWrap>
    <Caption>
      <TextLink
        href="https://help.monooq.com/ja/articles/2948108-%E3%83%9B%E3%82%B9%E3%83%88%E3%81%A8%E3%81%AE%E3%82%84%E3%82%8A%E5%8F%96%E3%82%8A%E3%81%AF%E3%81%A9%E3%81%86%E3%82%84%E3%81%A3%E3%81%A6%E9%80%B2%E3%82%81%E3%82%8B%E3%81%AE"
        fontSize={15}
        fontsizesp={15}
        target="_blank"
        rel="noopener noreferrer"
        className="gaSpaceDetailBottomFlowLink"
      >
        取引の流れをみる
      </TextLink>
    </Caption>
  </div>
);

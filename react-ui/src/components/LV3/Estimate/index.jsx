import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import { H1, H2 } from 'components/LV1/Texts/Headline';
import InputSchedule from 'components/LV2/Estimate/InputSchedule';
import InputPrice from 'components/LV2/Estimate/InputPrice';

const Section = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

const LinkHelpWrap = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

const HyperLink = styled.a`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.small_15}px;
  ${mediaMin.tablet`
    &:hover {
      color: ${Colors.brandPrimary};
      opacity: 0.8;
    }
  `};
`;

export default ({ schedule, price, buttonLoading, buttonDisabled, onClickSend, onKeyDownSend }) => (
  <div>
    <H1 bold>お見積り</H1>
    <Section>
      <H2 as="h2">スケジュール</H2>
      <InputSchedule {...schedule} />
    </Section>
    <Section>
      <H2 as="h2">料金を入力</H2>
      <InputPrice {...price} />
    </Section>
    <Section>
      <ButtonWrap>
        <Button
          primary
          fill={1}
          fontbold
          loading={buttonLoading}
          disabled={buttonDisabled}
          onClick={buttonLoading ? null : onClickSend}
          onKeyDown={onKeyDownSend}
        >
          この見積もりを送る
        </Button>
      </ButtonWrap>
      <LinkHelpWrap>
        <HyperLink
          href="https://help.monooq.com/ja/articles/3694521"
          target="_blank"
          rel="noopener noreferrer"
        >
          見積もりの出し方
        </HyperLink>
      </LinkHelpWrap>
    </Section>
  </div>
);

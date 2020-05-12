import React from 'react';
import styled from 'styled-components';
import { Dimens, FontSizes, Colors } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import InputSchedule from 'components/LV2/Estimate/InputSchedule';
import UsagePeriod from 'components/LV2/Estimate/UsagePeriod';
import ExpectedEndDate from 'components/LV2/Estimate/ExpectedEndDate';
import Tatami from 'components/LV2/Estimate/Tatami';
import Detail from 'components/LV2/Estimate/Detail';

const Wrap = styled.div`
  width: 100%;
  max-width: 375px;
  margin: auto;
`;

const Section = styled.div`
  margin-top: ${Dimens.medium2}px;
  ${props =>
    props.caption &&
    `
    font-size: ${FontSizes.small_12}px;
    color: ${Colors.lightGray10};
    line-height: normal;
  `};
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
  &:active {
    color: ${Colors.brandPrimary};
    opacity: 0.8;
  }
  ${mediaMin.tablet`
    &:hover {
      color: ${Colors.brandPrimary};
      opacity: 0.8;
    }
  `};
`;

export default ({
  schedule,
  usagePeriod,
  tatamiProperty,
  price,
  buttonLoading,
  buttonDisabled,
  onClickSend,
  onKeyDownSend,
}) => (
  <Wrap>
    <H1 bold>見積もり作成</H1>
    <Section>
      <InputSchedule {...schedule} isOnlyBeginDate />
    </Section>
    <Section>
      <UsagePeriod {...usagePeriod} />
    </Section>
    <Section>
      <ExpectedEndDate {...usagePeriod} />
    </Section>
    <Section>
      <Tatami {...tatamiProperty} />
    </Section>
    <Section>
      <Detail price={price} />
    </Section>
    <Section caption>
      利用金額が変更になった場合、あとから内容を変更して見積もりを再発行することも可能です。
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
          この見積もりを送信
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
  </Wrap>
);

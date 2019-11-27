import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputPriceOfType from 'components/LV2/Forms/InputPriceOfType';
import ErrorList from 'components/LV2/Lists/ErrorList';
import imageFurnitureFull from 'images/furniture-full.svg';
import imageFurnitureTatami from 'images/furniture-tatami.svg';
import { Dimens } from 'variables';
import { Section } from './Shared';

const CommissionWrap = styled.div`
  margin-bottom: ${Dimens.medium1}px;
`;

const CaptionWrap = styled.div`
  ${props =>
    props.sub &&
    `
      margin-top: ${Dimens.xsmall}px;
    `};
`;

const UnderLine = styled.span`
  text-decoration: underline;
`;

export default ({
  errors,
  priceFull,
  onChangePriceFull,
  priceTatami,
  onChangePriceTatami,
  buttonLoading,
  onClickBack,
  onKeyDownButtonBack,
  onClickNext,
  onKeyDownButtonNext,
  buttonNextDisabled,
}) => (
  <div>
    <Section marginTopSp={20}>
      <CaptionWrap>
        <InlineText.Base>様々なご相談に対応できるように料金目安を設定しましょう。</InlineText.Base>
      </CaptionWrap>
      <CaptionWrap sub>
        <InlineText.Tiny>
          お客様によって荷物の内容が異なるので、スペースの広さに対する料金を設定してください。
          <br />
          <InlineText.Bold>
            エリアや条件にもよりますが、目安は
            <UnderLine>1畳あたり約5,000〜7,000円/月</UnderLine>
            です。
          </InlineText.Bold>
        </InlineText.Tiny>
      </CaptionWrap>
    </Section>
    <Section marginTop={20}>
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="スペースを全範囲使用する場合の料金"
        placeholder="30,000"
        price={priceFull}
        onChange={onChangePriceFull}
        error={<ErrorList keyName="price_errors_1" errors={errors.priceFull} />}
      />
      <InputPriceOfType
        image={imageFurnitureTatami}
        title="1畳分のスペースの月額料金"
        caption="スペースの一部を使用する場合の1畳あたりの料金"
        placeholder="16,000"
        price={priceTatami}
        onChange={onChangePriceTatami}
        error={<ErrorList keyName="price_errors_2" errors={errors.priceHalf} />}
      />
    </Section>
    <Section marginTop={20}>
      <CommissionWrap>
        <InlineText.Base>
          取引成立時の売り上げは、お客様があなたへお支払いするスペース利用額から20%をご利用料金として引かせていただきます。
          20%にはサービス利用手数料と、保管荷物の保険料が含まれています。
        </InlineText.Base>
      </CommissionWrap>
    </Section>
    <Section>
      <ButtonEntry
        relative
        enabled
        loading={buttonLoading}
        backButton={{
          text: '戻る',
          onClick: onClickBack,
          onKeyDown: onKeyDownButtonBack,
        }}
        enabledButton={{
          text: `確認画面へ`,
          onClick: onClickNext,
          onKeyDown: onKeyDownButtonNext,
          disabled: buttonNextDisabled,
        }}
      />
    </Section>
  </div>
);

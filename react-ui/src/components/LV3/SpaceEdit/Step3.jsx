import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputPriceOfType from 'components/LV2/Forms/InputPriceOfType';
import ErrorList from 'components/LV2/Lists/ErrorList';
import imageFurnitureFull from 'images/img-furniture-full.svg';
import imageFurnitureTatami from 'images/img-furniture-tatami.svg';
import ImageStatusEditSpace3 from 'images/img-status-edit-space3.svg';
import { Dimens } from 'variables';
import { PageHeader, Section } from './Shared';

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
  isPriceTatami,
  edit,
  errors,
  isRoom,
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
    <PageHeader optionItem={{ src: ImageStatusEditSpace3, edit }} />
    <Section marginTopSp={20}>
      <CaptionWrap>
        <InlineText.Base>
          {isRoom
            ? '様々なご相談に対応できるように料金を設定しましょう。'
            : '目安となる料金を設定しましょう。'}
        </InlineText.Base>
      </CaptionWrap>
      <CaptionWrap sub>
        <InlineText.Tiny>
          ゲストによって荷物の内容が異なるので、スペースの広さに対する月額料金を設定してください。
          <br />
          {isRoom ? (
            <InlineText.Bold>
              地域や条件によりますが、目安は
              <UnderLine>1畳あたり7,000円〜/月</UnderLine>
              です。
            </InlineText.Bold>
          ) : (
            'より細かな範囲での料金目安がある場合は、スペース紹介文への記入がおすすめです。'
          )}
        </InlineText.Tiny>
      </CaptionWrap>
    </Section>
    <Section marginTop={20}>
      {isPriceTatami && (
        <InputPriceOfType
          image={imageFurnitureTatami}
          title="1畳分のスペースの月額料金"
          caption="スペースの一部を使用する場合の1畳あたりの料金"
          placeholder="6,000"
          price={priceTatami}
          onChange={onChangePriceTatami}
          error={<ErrorList keyName="price_errors_2" errors={errors.priceTatami} />}
        />
      )}
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="スペースを全範囲使用する場合の料金"
        placeholder="30,000"
        price={priceFull}
        onChange={onChangePriceFull}
        error={<ErrorList keyName="price_errors_1" errors={errors.priceFull} />}
      />
    </Section>
    <Section marginTop={20}>
      <CommissionWrap>
        <InlineText.Base>
          スペース利用料の70%が取引成立時の売り上げになります。残りの30%はモノオクが手数料として頂戴し、プラットフォーム運営費用や保管荷物の保険料として活用いたします。
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

import React from 'react';
import styled from 'styled-components';
import InlineText from 'components/LV1/Texts/InlineText';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputPriceOfType from 'components/LV2/Forms/InputPriceOfType';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { Dimens } from 'variables';
import { PageHeader, Section } from './Shared';

const ImageStatusEditSpace3 =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-status-edit-space3.svg?auto=compress';
const imageFurnitureFull =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-furniture-full.svg?auto=compress';
const imageFurnitureTatami =
  'https://monooq.imgix.net/img%2Fservice%2Fimg-furniture-tatami.svg?auto=compress';

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
  edit,
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
  isOverPhone,
}) => (
  <div>
    <PageHeader optionItem={{ src: ImageStatusEditSpace3, edit }} />
    <Section marginTopSp={20}>
      <CaptionWrap>
        <InlineText.Base>様々なご相談に対応できるように料金を設定しましょう。</InlineText.Base>
      </CaptionWrap>
      <CaptionWrap sub>
        <InlineText.Tiny>
          ゲストによって荷物の内容が異なるので、スペースの広さに対する月額料金を設定してください。
          <br />
          <InlineText.Bold>
            地域や条件によりますが、目安は
            <UnderLine>1畳あたり7,000円〜/月</UnderLine>
            です。
          </InlineText.Bold>
        </InlineText.Tiny>
      </CaptionWrap>
    </Section>
    <Section marginTop={20}>
      <InputPriceOfType
        image={imageFurnitureTatami}
        title="1畳分のスペースの月額料金"
        caption="スペースの一部を使用する場合の1畳あたりの料金"
        placeholder="6,000"
        price={priceTatami}
        onChange={onChangePriceTatami}
        error={<ErrorList keyName="price_errors_2" errors={errors.priceTatami} />}
        isOverPhone={isOverPhone}
      />
      <InputPriceOfType
        image={imageFurnitureFull}
        title="全てのスペースの月額料金"
        caption="スペースを全範囲使用する場合の料金"
        placeholder="30,000"
        price={priceFull}
        onChange={onChangePriceFull}
        error={<ErrorList keyName="price_errors_1" errors={errors.priceFull} />}
        isOverPhone={isOverPhone}
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

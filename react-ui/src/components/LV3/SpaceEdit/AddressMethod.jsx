import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { selectOptionreceiptTypes } from 'helpers/receiptTypes';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import ImageStatusEditSpace2 from 'images/status-edit-space2.svg';
import { Dimens, FontSizes } from 'variables';
import { PageHeader, Section } from './Shared';

const TitleName = styled.div`
  font-size: ${FontSizes.medium_18}px;
  line-height: 27px;
  font-weight: bold;
  margin: ${Dimens.medium2}px auto -${Dimens.small2_15}px;
`;

export default ({
  edit,
  errors,
  address,
  onChangeAddress,
  receiptType,
  onChangereceiptType,
  onClickBack,
  onKeyDownButtonBack,
  onClickNext,
  onKeyDownButtonNext,
  buttonNextDisabled,
}) => (
  <div>
    <PageHeader optionItem={{ src: ImageStatusEditSpace2, edit }} />
    <Section>
      <InputForm
        label="スペースの住所"
        hintbottom="取引が成立するまで番地以降の住所は表示されません。番地は半角数字で入力してください。"
        placeholder="例）東京都渋谷区渋谷2-6-6-201"
        value={address}
        onChange={e => onChangeAddress(e.target.value)}
      />
      <ErrorList keyName="address_errors" errors={errors.address} />
    </Section>
    <TitleName>荷物の対応方法</TitleName>
    <Section>
      <Select
        label="受け取り方法"
        options={selectOptionreceiptTypes('選択してください')}
        value={receiptType}
        onChange={e => onChangereceiptType(e.target.value)}
      />
      <ErrorList keyName="receive_errors" errors={errors.ReceiptType} />
    </Section>
    <Section>
      <ButtonEntry
        relative
        enabled
        backButton={{
          text: '戻る',
          onClick: onClickBack,
          onKeyDown: onKeyDownButtonBack,
        }}
        enabledButton={{
          text: '次へ',
          onClick: onClickNext,
          onKeyDown: onKeyDownButtonNext,
          disabled: buttonNextDisabled,
        }}
      />
    </Section>
  </div>
);

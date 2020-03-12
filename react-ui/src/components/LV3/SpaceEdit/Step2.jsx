import React from 'react';
import styled from 'styled-components';
import { selectOptionReceiptTypes } from 'helpers/receiptTypes';
import Address from 'components/LV2/Forms/Address';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';
import ImageStatusEditSpace2 from 'images/img-status-edit-space2.svg';
import { Dimens, FontSizes } from 'variables';
import { PageHeader, Section } from './Shared';

const TitleName = styled.div`
  max-width: 540px;
  font-size: ${FontSizes.medium_18}px;
  line-height: 27px;
  font-weight: bold;
  margin: ${Dimens.medium2}px auto -${Dimens.small2_15}px;
  ${props =>
    props.address &&
    `
      margin: ${Dimens.medium2}px auto -${Dimens.medium2}px;
    `};
`;

export default ({
  edit,
  errors,
  formAddress,
  onChangePostalCode,
  onChangePref,
  onChangeTown,
  onChangeLine1,
  buttonAddressDisabled,
  buttonAddressLoading,
  onClickGetAddress,
  onKeyDownButtonGetAddress,
  receiptType,
  onChangeReceiptType,
  onClickBack,
  onKeyDownButtonBack,
  onClickNext,
  onKeyDownButtonNext,
  buttonNextDisabled,
}) => (
  <div>
    <PageHeader optionItem={{ src: ImageStatusEditSpace2, edit }} />
    <TitleName address>スペースの住所</TitleName>
    <Section>
      <Address
        errors={errors}
        formAddress={formAddress}
        onChangePostalCode={onChangePostalCode}
        onChangePref={onChangePref}
        onChangeTown={onChangeTown}
        onChangeLine1={onChangeLine1}
        buttonAddressDisabled={buttonAddressDisabled}
        buttonAddressLoading={buttonAddressLoading}
        onClickGetAddress={onClickGetAddress}
        onKeyDownButtonGetAddress={onKeyDownButtonGetAddress}
      />
    </Section>
    <TitleName>荷物の対応方法</TitleName>
    <Section>
      <Select
        label="受け取り方法"
        options={selectOptionReceiptTypes('選択してください')}
        value={receiptType}
        onChange={e => onChangeReceiptType(e.target.value)}
      />
      <ErrorList keyName="receive_errors" errors={errors.receiptType} />
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

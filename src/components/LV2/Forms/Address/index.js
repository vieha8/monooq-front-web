import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from 'components/LV1/Forms/Button';
import InputForm from 'components/LV2/Forms/InputForm';
import ErrorList from 'components/LV2/Lists/ErrorList';
import { Dimens } from 'variables';

const Wrap = styled.div`
  display: flex;
`;

const PostalCodeLeft = styled.div`
  width: calc(100% - 162px);
  margin-right: 10px;
`;

const PostalCodeRight = styled.div`
  width: 152px;
  margin: ${Dimens.small}px auto 0;
`;

const PrefTownLeft = styled.div`
  width: 100px;
  margin-right: 10px;
`;

const PrefTownRight = styled.div`
  width: calc(100% - 112px);
`;

const AddressHint = () => (
  <Fragment>
    番地以降・マンション名は取引の成立後、成立相手にのみ表示されます。
    <br />
    郵便番号はハイフン(-)ありで入力してください。
    <br />
    番地は半角数字で入力してください。
  </Fragment>
);

export default ({
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
}) => (
  <Fragment>
    <Wrap>
      <PostalCodeLeft>
        <InputForm
          type="text"
          inputmode="tel"
          placeholder="例) 150-0002"
          value={formAddress.postalCode}
          onChange={e => onChangePostalCode(e.target.value)}
          autoComplete="postal-code"
        />
      </PostalCodeLeft>
      <PostalCodeRight>
        <Button
          quaternary
          isInverted
          fill={1}
          height={50}
          lineheight={25}
          fontSize={14}
          disabled={buttonAddressDisabled}
          onClick={buttonAddressLoading ? null : onClickGetAddress}
          loading={buttonAddressLoading}
          onKeyDown={onKeyDownButtonGetAddress}
        >
          住所を自動で入力
        </Button>
      </PostalCodeRight>
    </Wrap>
    <Wrap>
      <PrefTownLeft>
        <InputForm
          margintop={12}
          placeholder="例) 東京都"
          value={formAddress.pref}
          onChange={e => onChangePref(e.target.value)}
          autoComplete="address-level1"
        />
      </PrefTownLeft>
      <PrefTownRight>
        <InputForm
          margintop={12}
          placeholder="例) 渋谷区渋谷"
          value={formAddress.town}
          onChange={e => onChangeTown(e.target.value)}
          autoComplete="address-level2"
        />
      </PrefTownRight>
    </Wrap>
    <InputForm
      margintop={12}
      placeholder="例) 2-6-6 モノオクマンション 301号室"
      hintbottom={AddressHint()}
      value={formAddress.line1}
      onChange={e => onChangeLine1(e.target.value)}
      autoComplete="address-line1"
    />
    <ErrorList keyName="postalCode_errors" errors={errors.postalCode} />
    <ErrorList keyName="address_errors" errors={errors.address} />
    <ErrorList keyName="pref_errors" errors={errors.pref} />
    <ErrorList keyName="town_errors" errors={errors.town} />
    <ErrorList keyName="line1_errors" errors={errors.line1} />
  </Fragment>
);

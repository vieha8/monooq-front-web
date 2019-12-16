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
    取引が成立するまで番地以降の住所は表示されません。
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
  onChangeLine2,
  buttonAddressDisabled,
  buttonAddressLoading,
  onClickGetAddress,
  onKeyDownButtonGetAddress,
}) => (
  <Fragment>
    <Wrap>
      <PostalCodeLeft>
        <InputForm
          type="tel"
          placeholder="例) 1500002"
          value={formAddress.postalCode}
          onChange={e => onChangePostalCode(e.target.value)}
        />
      </PostalCodeLeft>
      <PostalCodeRight>
        <Button
          quaternary
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
          disabled
          margintop={12}
          placeholder="例) 東京都"
          value={formAddress.pref}
          onChange={e => onChangePref(e.target.value)}
        />
      </PrefTownLeft>
      <PrefTownRight>
        <InputForm
          disabled
          margintop={12}
          placeholder="例) 渋谷区渋谷"
          value={formAddress.town}
          onChange={e => onChangeTown(e.target.value)}
        />
      </PrefTownRight>
    </Wrap>
    <InputForm
      margintop={12}
      placeholder="例) 2-6-6"
      value={formAddress.line1}
      onChange={e => onChangeLine1(e.target.value)}
    />
    <InputForm
      margintop={12}
      placeholder="例) モノオクマンション 301号室"
      hintbottom={AddressHint()}
      value={formAddress.line2}
      onChange={e => onChangeLine2(e.target.value)}
    />
    <ErrorList keyName="postalCode_errors" errors={errors.postalCode} />
    <ErrorList keyName="pref_errors" errors={errors.pref} />
    <ErrorList keyName="line1_errors" errors={errors.line1} />
  </Fragment>
);

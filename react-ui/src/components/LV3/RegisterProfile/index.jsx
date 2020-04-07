import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors, FontSizes } from 'variables';
import { selectOptionPrefectures } from 'helpers/prefectures';
import { mediaMin } from 'helpers/style/media-query';
import RegsiterProfileImage from 'components/LV1/Forms/DragAndDrop/RegisterProfileImage';
import Button from 'components/LV1/Forms/Button';
import { H3 } from 'components/LV1/Texts/Headline';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import IconInteriaBlack from 'images/icon-interia-black.svg';
import IconInteriaGray from 'images/icon-interia-gray.svg';
import IconHomeBlack from 'images/icon-home-black.svg';
import IconHomeGray from 'images/icon-home-gray.svg';
import Form from './Form';

const regsiterProfileImage = (imagePreview, image, onChangeImage) => {
  return (
    <RegsiterProfileImage onDrop={data => onChangeImage(data[0])} image={imagePreview || image} />
  );
};

const inputForm = (
  label,
  hint,
  placeholder,
  onChange,
  value,
  multiline,
  rows,
  type,
  extension,
  className,
) => {
  return (
    <InputForm
      label={label}
      hint={hint}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      multiline={multiline}
      rows={rows}
      type={type}
      extension={extension}
      className={className}
    />
  );
};

const selectForm = (onChangeArea, prefCode, className) => {
  return (
    <Select
      label="お住いの都道府県"
      options={selectOptionPrefectures('選択してください')}
      onChange={e => onChangeArea(e.target.value)}
      value={prefCode}
      className={className}
    />
  );
};

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: ${Dimens.small}px;
`;

const ButtonPurpose = styled.div`
  box-sizing: border-box;
  width: calc(100% - 2.5px);
  padding: ${Dimens.huge}px 0 ${Dimens.medium1}px;
  text-align: center;
  font-size: ${FontSizes.small}px;
  font-weight: bold;
  line-height: normal;
  border: 2px solid ${Colors.borderGray};
  border-radius: 3px;
  cursor: pointer;
  ${props =>
    props.home
      ? `
        background-image: url(${IconHomeBlack}), url(${IconHomeGray});
        background-size: 0, 56px;
        `
      : `
        background-image: url(${IconInteriaBlack}), url(${IconInteriaGray});
        background-size: 0, 50px;
        `};
  background-position: center calc(50% - 12px);
  background-repeat: no-repeat;
  &:nth-child(2n) {
    margin-left: ${Dimens.xxsmall_5}px;
  }
  ${props =>
    props.isHost &&
    `
      background-size: ${props.home ? '56px, 0' : '50px, 0'};
      background-color: ${Colors.lightGray1Bg};
      border: 2px solid ${Colors.black};
    `};
  ${mediaMin.tablet`
    &:hover {
      opacity: 0.8;
    }
  `};
`;

const buttonPurpose = (isHost, onClickPurposeGuest, onClickPurposeHost) => {
  return (
    <Fragment>
      <H3 bold as="h3">
        用途が近いのはどちらですか？
      </H3>
      <ButtonWrap>
        <ButtonPurpose onClick={onClickPurposeGuest} isHost={!isHost}>
          荷物を預ける
        </ButtonPurpose>
        <ButtonPurpose onClick={onClickPurposeHost} home isHost={isHost}>
          スペース運営する
        </ButtonPurpose>
      </ButtonWrap>
    </Fragment>
  );
};

const buttonFinish = (buttonDisabled, buttonLoading, onClickRegisterProfile) => {
  return (
    <Button
      primary
      borderbold
      fontbold
      fill={1}
      loading={buttonLoading}
      disabled={buttonDisabled}
      onClick={onClickRegisterProfile}
    >
      完了
    </Button>
  );
};

export default ({
  isHost,
  errors,
  onChangeImage,
  imagePreview,
  image,
  onChangeName,
  name,
  onChangePhoneNumber,
  phoneNumber,
  onChangeArea,
  prefCode,
  onClickPurposeHost,
  onClickPurposeGuest,
  buttonDisabled,
  buttonLoading,
  onClickRegisterProfile,
  story,
}) => (
  <Form
    story={story}
    errors={errors}
    image={inputForm(
      '',
      '',
      '',
      '',
      '',
      false,
      0,
      '',
      regsiterProfileImage(imagePreview, image, onChangeImage),
      'gaSignupImage',
    )}
    name={inputForm(
      'お名前',
      '',
      '入力してください',
      e => onChangeName(e.target.value),
      name,
      false,
      0,
      '',
      '',
      'gaSignupName',
    )}
    phoneNumber={inputForm(
      '電話番号',
      '',
      '09012345678',
      e => onChangePhoneNumber(e.target.value),
      phoneNumber,
      false,
      0,
      'tel',
      '',
      'gaSignupPhoneNumber',
    )}
    prefCode={selectForm(onChangeArea, prefCode, 'gaSignupPref')}
    buttonPurpose={buttonPurpose(isHost, onClickPurposeGuest, onClickPurposeHost)}
    button={buttonFinish(buttonDisabled, buttonLoading, onClickRegisterProfile)}
  />
);

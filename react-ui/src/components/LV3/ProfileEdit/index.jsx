import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Dimens, ErrorMessages } from 'variables';
import { userActions } from 'redux/modules/user';
import { iskeyDownEnter, iskeyDownSpace } from 'helpers/keydown';
import { media } from 'helpers/style/media-query';
import { selectOptionPrefectures } from 'helpers/prefectures';
import selectOptionPurpose from 'helpers/purposes';
import Button from 'components/LV1/Forms/Button';
import RegsiterProfileImage from 'components/LV1/Forms/DragAndDrop/RegisterProfileImage';
import { H1 } from 'components/LV1/Texts/Headline';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ErrorList from 'components/LV2/Lists/ErrorList';

const PURPOSE_USER = '1';
const PURPOSE_HOST = '2';

const Validate = {
  Email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  phoneNumber: {
    NoHyphenVer: /^0\d{9,10}$/, // 先頭「0」+「半角数字9〜10桁」
    HyphenVer: /^0\d{2,3}-\d{2,4}-\d{4}$/, // 先頭「0」＋「半角数字2〜3桁」＋「-」＋「半角数字1〜4桁」＋「-」＋「半角数字4桁」
  },
  ImageSize: {
    Max: 10485760, // 10MB
  },
  Profile: {
    Max: 1000,
    nameMax: 40,
  },
};

const Row = styled.div`
  &:not(:first-child) {
    margin: ${Dimens.medium2}px 0;
  }
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

const extention = (onChangeImage, imageUrlPreview, imageUrl) => {
  return (
    <RegsiterProfileImage
      onDrop={data => onChangeImage(data[0])}
      image={imageUrlPreview || imageUrl}
      noMarginleft
    />
  );
};

const ProfileEdit = ({ user, errMessage, buttonLoading }) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(errMessage ? {}.push({ email: errMessage }) : {});
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [imageUrlPreview, setImageUrlPreview] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [prefCode, setPrefCode] = useState(user.prefCode);
  const [profile, setProfile] = useState(user.profile);
  const [purpose, setPurpose] = useState(user.isHost ? PURPOSE_HOST : PURPOSE_USER);
  const [isNoticeEmail, setNoticeEmail] = useState(user.isNoticeEmail);

  const validate = () => {
    return (
      (errors.imageUrl === undefined || (errors.imageUrl && errors.imageUrl.length === 0)) &&
      name &&
      (name === undefined
        ? false
        : name.trim().length > 0 && name.trim().length <= Validate.Profile.nameMax) &&
      email &&
      email.match(Validate.Email) &&
      phoneNumber &&
      (phoneNumber.match(Validate.phoneNumber.NoHyphenVer) ||
        phoneNumber.match(Validate.phoneNumber.HyphenVer)) &&
      prefCode &&
      (!profile || (profile && profile.length <= Validate.Profile.Max)) &&
      purpose
    );
  };

  const handleChangeUI = (propName, inputValue) => {
    const setError = [];

    switch (propName) {
      case 'imageUrl':
        if (inputValue && inputValue.size > Validate.ImageSize.Max) {
          setError.push(ErrorMessages.OverSizeSpaceImage('10MB'));
        }
        setImageUrlPreview(URL.createObjectURL(inputValue));
        break;

      case 'name':
        if (!inputValue || inputValue.trim().length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        }
        if (inputValue && inputValue.trim().length > Validate.Profile.nameMax) {
          setError.push(ErrorMessages.LengthMax('お名前', Validate.Profile.nameMax));
        }
        break;

      case 'email':
        if (!inputValue || inputValue.replace(/\s/g, '').length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        } else if (!inputValue.match(Validate.Email)) {
          setError.push(ErrorMessages.InvalidEmail);
        }
        break;

      case 'phoneNumber':
        if (!inputValue || inputValue.replace(/\s/g, '').length === 0) {
          setError.push(ErrorMessages.PleaseInput);
        } else if (
          !(
            inputValue.match(Validate.phoneNumber.NoHyphenVer) ||
            inputValue.match(Validate.phoneNumber.HyphenVer)
          )
        ) {
          setError.push(ErrorMessages.InvalidPhoneNumber);
        }
        break;

      case 'profile':
        if (inputValue && inputValue.length > Validate.Profile.Max) {
          setError.push(ErrorMessages.LengthMax('自己紹介', Validate.Profile.Max));
        }
        break;

      case 'prefCode':
      case 'purpose':
        if (inputValue.length === 0) {
          setError.push(ErrorMessages.PleaseSelect);
        }
        break;

      default:
        break;
    }
    setErrors(state => ({ ...state, [propName]: setError }));
  };

  useEffect(() => {
    handleChangeUI('name', name);
    handleChangeUI('email', email);
    handleChangeUI('phoneNumber', phoneNumber);
    handleChangeUI('prefCode', prefCode);
    handleChangeUI('profile', profile);
    handleChangeUI('purpose', purpose);
  }, []);

  const onClickUpdate = () => {
    if (validate()) {
      dispatch(
        userActions.updateUser({
          userId: user.id,
          body: {
            imageUrl,
            name: name === undefined ? '' : name.trim(),
            email,
            phoneNumber,
            prefCode,
            profile: profile === undefined ? '' : profile.trim(),
            purpose,
            isHost: purpose === PURPOSE_HOST,
            isNoticeEmail,
          },
        }),
      );
    }
  };

  const onKeyDownButtonUpdate = e => {
    if (iskeyDownEnter(e) && validate()) {
      onClickUpdate();
    }
  };

  return (
    <Fragment>
      <H1 bold>プロフィール編集</H1>
      <Row>
        <InputForm
          label="プロフィール写真"
          extension={extention(
            value => handleChangeUI('imageUrl', value, setImageUrl(value)),
            imageUrlPreview,
            imageUrl,
          )}
        />
        <ErrorList keyName="imageurl_errors" errors={errors.imageUrl} />
      </Row>
      <Row>
        <InputForm
          label="お名前"
          placeholder="ニックネーム可"
          onChange={e => handleChangeUI('name', e.target.value, setName(e.target.value))}
          value={name}
        />
        <ErrorList keyName="name_errors" errors={errors.name} />
      </Row>
      <Row>
        <InputForm
          label="メールアドレス"
          placeholder="info@monooq.com"
          onChange={e => handleChangeUI('email', e.target.value, setEmail(e.target.value))}
          value={email}
          autoComplete="email"
        />
        <ErrorList keyName="email_errors" errors={errors.email} />
      </Row>
      <Row>
        <InputForm
          checkbox
          labelCheckBox="サービスに関するお知らせメールを受け取る"
          checked={isNoticeEmail}
          onClickCheck={() => setNoticeEmail(!isNoticeEmail)}
          onKeyDown={e => (iskeyDownSpace(e) ? () => setNoticeEmail(!isNoticeEmail) : null)}
        />
      </Row>
      <Row>
        <InputForm
          label="電話番号"
          placeholder="09012345678"
          onChange={e =>
            handleChangeUI('phoneNumber', e.target.value, setPhoneNumber(e.target.value))
          }
          value={phoneNumber}
          type="tel"
          hint="取引時の保険適用に必須となります。緊急時の連絡先として利用させていただく場合もございます。"
          name="tel"
          autoComplete="tel"
        />
        <ErrorList keyName="phoneNumber_errors" errors={errors.phoneNumber} />
      </Row>
      <Row>
        <Select
          label="お住いの地域"
          options={selectOptionPrefectures('選択してください')}
          onChange={e => handleChangeUI('prefCode', e.target.value, setPrefCode(e.target.value))}
          value={prefCode}
        />
        <ErrorList keyName="prefCode_errors" errors={errors.prefCode} />
      </Row>
      <Row>
        <InputForm
          label="自己紹介"
          placeholder="はじめまして！ホストのYUKIです！部屋が一つ空いたので必要な方に使っていただければと思い登録してみました。ダンボール1箱～大きめの家具まで相談に乗ります。また、1階でのお預かりですので荷物の搬入出が簡単です。まずは気軽にご相談ください！"
          rows={6}
          multiline
          onChange={e => handleChangeUI('profile', e.target.value, setProfile(e.target.value))}
          value={profile}
        />
        <ErrorList keyName="profile_errors" errors={errors.profile} />
      </Row>
      <Row>
        <Select
          label="モノオクの利用方法"
          options={selectOptionPurpose('選択してください')}
          onChange={e => handleChangeUI('purpose', e.target.value, setPurpose(e.target.value))}
          value={purpose}
        />
        <ErrorList keyName="purpose_errors" errors={errors.purpose} />
      </Row>
      <ButtonWrap>
        <Button
          primary
          fill={1}
          fontbold
          disabled={!validate()}
          onClick={buttonLoading ? null : onClickUpdate}
          loading={buttonLoading}
          onKeyDown={onKeyDownButtonUpdate}
        >
          プロフィールを更新する
        </Button>
      </ButtonWrap>
    </Fragment>
  );
};

export default ProfileEdit;

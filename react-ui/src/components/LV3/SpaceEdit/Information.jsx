import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import { H1 } from 'components/LV1/Texts/Headline';
import ButtonEntry from 'components/LV2/Forms/ButtonEntry';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ImagePickerSpace from 'components/LV2/ImagePickerSpace';
import ErrorList from 'components/LV2/Lists/ErrorList';
import ImageStatusEditSpace1 from 'images/status-edit-space1.svg';
import { Dimens } from 'variables';
import { Section } from './Shared';

const PageHeader = styled.div`
  text-align: center;
`;

const TopImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin: 0 auto ${Dimens.medium3_40}px;
  ${media.phone`
    margin: 0 auto ${Dimens.medium}px;
    padding: 0 ${Dimens.medium}px;
  `};
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

export default ({
  edit,
  errors,
  address,
  onChangeAddress,
  type,
  onChangeType,
  title,
  onChangeTitle,
  images,
  onChangeImage,
  onClickDeleteImage,
  isImageUploading,
  introduction,
  onChangeIntroduction,
  OnClickRemove,
  onClickNext,
  onKeyDownButtonNext,
  buttonNextDisabled,
}) => (
  <div>
    <PageHeader>
      <TopImage src={ImageStatusEditSpace1} alt="image-edit-status" />
      <H1 bold>{`スペース${edit ? '編集' : '登録'}`}</H1>
    </PageHeader>
    <Section>
      <ImagePickerSpace
        images={images}
        onChangeImage={onChangeImage}
        onClickDeleteImage={onClickDeleteImage}
        isImageUploading={isImageUploading}
      />
      <ErrorList keyName="image_errors" errors={errors.images} />
    </Section>
    <Section>
      <InputForm
        label="スペースの紹介文"
        placeholder="例) 世田谷エリアにある6畳ほどのワンルームです。会社員のため平日は夜間の対応、土日は終日可能です。大事なお荷物、責任もってお預かりしますのでお気軽に問い合わせください！"
        multiline
        rows={6}
        value={introduction}
        onChange={e => onChangeIntroduction(e.target.value)}
      />
      <ErrorList keyName="introduction_errors" errors={errors.introduction} />
    </Section>
    <Section>
      <InputForm
        label="所在地"
        hintbottom="取引が成立するまで番地以降の住所は表示されません。番地は半角数字で入力してください。"
        placeholder="例）東京都渋谷区渋谷2-6-6-201"
        value={address}
        onChange={e => onChangeAddress(e.target.value)}
      />
      <ErrorList keyName="address_errors" errors={errors.address} />
    </Section>
    <Section>
      <Select
        label="スペースの種類"
        options={[
          {
            value: 3,
            text: '部屋',
          },
          {
            value: 1,
            text: 'クローゼット・押入れ',
          },
          {
            value: 4,
            text: '屋外倉庫',
          },
          {
            value: 5,
            text: 'その他',
          },
        ]}
        value={type}
        onChange={e => onChangeType(e.target.value)}
      />
      <ErrorList keyName="type_errors" errors={errors.type} />
    </Section>
    <Section>
      <InputForm
        label="タイトル"
        placeholder="例)【6畳】世田谷エリア、搬入の楽な1階スペース"
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
      />
      <ErrorList keyName="title_errors" errors={errors.title} />
    </Section>
    <Section>
      {edit ? (
        <ButtonEntry
          enabled
          relative
          remove
          backButton={{
            text: 'このスペースを削除する',
            modalTitle: 'スペース削除',
            modalText: '登録済みのスペースを削除します。よろしいですか？',
            onClick: OnClickRemove,
          }}
          enabledButton={{
            text: '次へ',
            onClick: onClickNext,
            onKeyDown: onKeyDownButtonNext,
            disabled: buttonNextDisabled,
          }}
        />
      ) : (
        <ButtonWrap>
          <Button
            primary
            fontbold
            fill={1}
            onClick={onClickNext}
            onKeyDown={onKeyDownButtonNext}
            disabled={buttonNextDisabled}
          >
            次へ
          </Button>
        </ButtonWrap>
      )}
    </Section>
  </div>
);

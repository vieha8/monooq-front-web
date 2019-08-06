// @flow

import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import SpaceImagePicker from 'components/LV2/SpaceImagePicker';
import Button from 'components/LV1/Button';
import DisplayErrors from 'components/LV2/DisplayErrors';
import EntryButtons from 'components/LV2/EntryButtons';
import InputForm from 'components/LV2/InputForm';
import SelectForm from 'components/LV2/SelectForm';
import { Section } from './Shared';

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.phone`
    max-width: 100%;
  `};
`;

type PropTypes = {
  edit: boolean,
  errors: Array<Array<string>>,
  address: string,
  onChangeAddress: Function,
  type: number,
  onChangeType: Function,
  title: string,
  onChangeTitle: Function,
  images: Array<{ url: string }>,
  onChangeImage: Function,
  onClickDeleteImage: Function,
  isImageUploading: boolean,
  introduction: string,
  onChangeIntroduction: Function,
  OnClickRemove: Function,
  onClickNext: Function,
  onKeyDownButtonNext: Function,
  buttonNextDisabled: boolean,
};

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
}: PropTypes) => (
  <div>
    <Section>
      <InputForm
        label="所在地"
        hintbottom="取引が成立するまで番地以降の住所は表示されません。番地は半角数字で入力してください。"
        placeholder="例）東京都渋谷区渋谷2-6-6-201"
        value={address}
        onChange={e => onChangeAddress(e.target.value)}
      />
      <DisplayErrors keyName="address_errors" errors={errors.address} />
    </Section>
    <Section>
      <SelectForm
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
      <DisplayErrors keyName="type_errors" errors={errors.type} />
    </Section>
    <Section>
      <InputForm
        label="特徴がわかるタイトル"
        placeholder="【約6畳】新宿エリアのワンルーム！駐車場もあり搬入に便利！"
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
      />
      <DisplayErrors keyName="title_errors" errors={errors.title} />
    </Section>
    <Section>
      <SpaceImagePicker
        images={images}
        onChangeImage={onChangeImage}
        onClickDeleteImage={onClickDeleteImage}
        isImageUploading={isImageUploading}
      />
      <DisplayErrors keyName="image_errors" errors={errors.images} />
    </Section>
    <Section>
      <InputForm
        label="スペースの紹介文"
        placeholder="広さ6畳ほどのワンルームが余っています。長期利用も可能なので気軽にご相談ください！便利な新宿エリアで、駅から徒歩圏内の好アクセスです。駐車場もありますので、車搬入される場合も便利！"
        multiline
        rows={6}
        value={introduction}
        onChange={e => onChangeIntroduction(e.target.value)}
      />
      <DisplayErrors keyName="introduction_errors" errors={errors.introduction} />
    </Section>
    <Section>
      {edit ? (
        <EntryButtons
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

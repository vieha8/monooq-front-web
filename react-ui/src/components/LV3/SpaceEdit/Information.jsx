import React, { Fragment } from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import Button from 'components/LV1/Forms/Button';
import Tag from 'components/LV1/Texts/Tag';
import TagCheckboxList from 'components/LV2/Lists/TagCheckboxList';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ImagePickerSpace from 'components/LV2/ImagePickerSpace';
import ErrorList from 'components/LV2/Lists/ErrorList';
import ImageStatusEditSpace1 from 'images/status-edit-space1.svg';
import { Dimens } from 'variables';
import { PageHeader, Section } from './Shared';

const TagListWrap = styled.div`
  margin: ${Dimens.medium1}px auto 0;
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
  status,
  onChangeStatus,
  title,
  onChangeTitle,
  images,
  onChangeImage,
  onClickDeleteImage,
  isImageUploading,
  introduction,
  onChangeIntroduction,
  breadth,
  onChangeBreadth,
  tagList,
  tagCustom,
  onChangeTagCustom,
  tagCustomList,
  onClickNext,
  onKeyDownButtonNext,
  buttonNextDisabled,
}) => (
  <div>
    <PageHeader optionItem={{ src: ImageStatusEditSpace1, edit }} />
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
      <Select
        label="ステータス"
        options={[
          {
            value: 0,
            text: '空室',
          },
          {
            value: 1,
            text: '満室',
          },
          {
            value: 2,
            text: '要相談',
          },
        ]}
        value={status}
        onChange={e => onChangeStatus(e.target.value)}
      />
      <ErrorList keyName="status_errors" errors={errors.status} />
    </Section>
    <Section>
      <InputForm
        label="タイトル"
        placeholder="例)【6畳】世田谷エリア、搬入の楽な1階スペース"
        hintbottom="全角20文字まで"
        hintBottomRight
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
      />
      <ErrorList keyName="title_errors" errors={errors.title} />
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
      <Select
        label="スペースの広さ"
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
        value={breadth}
        onChange={e => onChangeBreadth(e.target.value)}
      />
      <ErrorList keyName="breadth_errors" errors={errors.breadth} />
    </Section>
    <Section>
      <TagCheckboxList tagList={tagList} />
      <InputForm
        placeholder="タグを追加する (全角8文字まで)"
        value={tagCustom}
        onChange={e => onChangeTagCustom(e.target.value)}
      />
      {tagCustomList && (
        <Fragment>
          <TagListWrap>
            <Tag tagList={tagCustomList} />
          </TagListWrap>
        </Fragment>
      )}
    </Section>
    <Section>
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
    </Section>
  </div>
);

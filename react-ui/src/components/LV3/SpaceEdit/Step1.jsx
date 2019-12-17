import React from 'react';
import styled from 'styled-components';
import { media } from 'helpers/style/media-query';
import { selectOptionBreadths } from 'helpers/breadths';
import Button from 'components/LV1/Forms/Button';
import Tag from 'components/LV1/Texts/Tag';
import InlineText from 'components/LV1/Texts/InlineText';
import TagCheckboxList from 'components/LV2/Lists/TagCheckboxList';
import InputForm from 'components/LV2/Forms/InputForm';
import Select from 'components/LV2/Forms/Select';
import ImagePickerSpace from 'components/LV2/ImagePickerSpace';
import ErrorList from 'components/LV2/Lists/ErrorList';
import ImageStatusEditSpace1 from 'images/status-edit-space1.svg';
import { Dimens } from 'variables';
import { PageHeader, Section } from './Shared';

const TagListWrap = styled.div`
  margin: ${Dimens.small}px auto 0;
`;

const ButtonWrap = styled.div`
  max-width: 240px;
  margin: auto;
  ${media.tablet`
    max-width: 100%;
  `};
`;

const HintBottomWrap = styled.div`
  margin-top: ${Dimens.medium}px;
  ${media.tablet`
    margin-top: ${Dimens.xsmall}px;
  `};
`;

export default ({
  edit,
  errors,
  errorsTagCustomMax,
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
  onClickTag,
  onKeyDownTag,
  tagCustom,
  onKeyDownTagCustom,
  onChangeTagCustom,
  tagCustomList,
  onClickTagCustomDelete,
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
            value: 'open',
            text: '空室',
          },
          {
            value: 'full',
            text: '満室',
          },
          {
            value: 'consultation',
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
        placeholder="例)【6畳】渋谷にある搬入の楽な1階スペース"
        hintbottom="全角40文字まで"
        hintBottomRight
        value={title}
        onChange={e => onChangeTitle(e.target.value)}
      />
      <ErrorList keyName="title_errors" errors={errors.title} />
    </Section>
    <Section>
      <InputForm
        label="スペースの紹介文"
        placeholder="例) 渋谷エリアにある6畳ほどのワンルームです。会社員のため平日は夜間の対応、土日は終日可能です。大事なお荷物、責任もってお預かりしますのでお気軽に問い合わせください！"
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
        options={selectOptionBreadths('選択してください')}
        value={breadth}
        onChange={e => onChangeBreadth(e.target.value)}
      />
      <ErrorList keyName="breadth_errors" errors={errors.sizeType} />
    </Section>
    <Section>
      <TagCheckboxList tagList={tagList} onClickTag={onClickTag} onKeyDownTag={onKeyDownTag} />
      <InputForm
        placeholder="タグを追加する (全角8文字まで)"
        value={tagCustom}
        onChange={e => onChangeTagCustom(e.target.value)}
        onKeyDown={onKeyDownTagCustom}
      />
      <ErrorList keyName="tagcustom_errors" errors={errors.tagCustom} />
      <ErrorList keyName="tagcustommax_errors" errors={errorsTagCustomMax} />
      {tagCustomList && (
        <TagListWrap>
          <Tag tagList={tagCustomList} onClick={onClickTagCustomDelete} isMarkDelete isNoLink />
        </TagListWrap>
      )}
      <HintBottomWrap>
        <InlineText.Tiny>
          各タグ入力後に改行またはエンターを押してください。
          <br />
          最大8個までアピールしたい特徴を追加できます。
        </InlineText.Tiny>
      </HintBottomWrap>
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

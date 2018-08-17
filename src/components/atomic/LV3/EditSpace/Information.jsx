// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/LV1/Headline';
import SpaceImagePicker from 'components/atomic/LV2/SpaceImagePicker';
import Button from 'components/atomic/LV1/Button';
import InlineText from 'components/atomic/LV1/InlineText';
import InputForm from 'components/atomic/LV2/InputForm';
import SelectForm from 'components/atomic/LV2/SelectForm';
import { Colors } from 'variables';
import { Section } from './Shared';

type PropTypes = {
  edit: boolean,
  images: Array<{ url: string }>,
  onChangeImage: Function,
  onClickDeleteImage: Function,
  title: string,
  titleErrors: Array<string>,
  onChangeTitle: Function,
  type: number,
  typeErrors: Array<string>,
  onChangeType: Function,
  introduction: string,
  introductionErrors: Array<string>,
  onChangeIntroduction: Function,
  address: string,
  addressErrors: Array<string>,
  onChangeAddress: Function,
  onClickNext: Function,
  changeOrientation: Function,
};

function displayErrors(key: string, errors: Array<string>) {
  return (
    Array.isArray(errors) &&
    errors.map((e, i) => (
      <div key={`${key}_${i}`}>
        <InlineText.Small color={Colors.error}>{e}</InlineText.Small>
      </div>
    ))
  );
}

export default (props: PropTypes) => (
  <div>
    <H1>{`スペースを${props.edit ? '編集' : '登録'}する`}</H1>
    <Section>
      <H2>どんなスペースを掲載しますか？</H2>
    </Section>
    <Section>
      <SpaceImagePicker
        images={props.images}
        onChangeImage={props.onChangeImage}
        onClickDeleteImage={props.onClickDeleteImage}
        changeOrientation={props.changeOrientation}
      />
    </Section>
    <Section>
      <InputForm
        label="特徴がわかるタイトルをつけましょう"
        hint="全角40文字まで。"
        placeholder="例）六本木駅チカで便利です。港区のど真ん中！長期預かりもOKです！"
        value={props.title}
        onChange={e => props.onChangeTitle(e.target.value)}
      />
      {displayErrors('title_errors', props.titleErrors)}
    </Section>
    <Section>
      <SelectForm
        label="スペースの種類は？"
        options={[
          {
            value: 0,
            text: '選択してください',
          },
          {
            value: 1,
            text: 'クローゼット',
          },
          {
            value: 2,
            text: '押入れ',
          },
          {
            value: 3,
            text: '部屋',
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
        value={props.type}
        onChange={e => props.onChangeType(e.target.value)}
      />
      {displayErrors('type_errors', props.typeErrors)}
    </Section>
    <Section>
      <InputForm
        label="スペースの紹介文"
        hint="スペース情報やあなたができることをアピールしましょう！"
        placeholder="例）家具も入れられるワンルームが余っています。数ヶ月の長期間でも可能です！朝〜夕方までなら荷物の出し入れにも対応できる日もあると思います。"
        multiline
        rows={4}
        value={props.introduction}
        onChange={e => props.onChangeIntroduction(e.target.value)}
      />
      {displayErrors('introduction_errors', props.introductionErrors)}
    </Section>
    <Section>
      <InputForm
        label="所在地はどこ？"
        hint="取引が成立するまで番地以降の住所は表示されません。番地は半角数字でご入力ください。"
        placeholder="例）東京都杉並区高円寺南2-48-12"
        value={props.address}
        onChange={e => props.onChangeAddress(e.target.value)}
      />
      {displayErrors('address_errors', props.addressErrors)}
    </Section>
    <Section>
      <Button primary fill onClick={props.onClickNext}>
        次へ
      </Button>
    </Section>
  </div>
);

// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/atoms/Headline';
import SpaceImagePicker from 'components/atomic/molecules/SpaceImagePicker';
import Button from 'components/atomic/atoms/Button';
import InputForm from 'components/atomic/molecules/InputForm';
import SelectForm from 'components/atomic/molecules/SelectForm';
import { Section } from './Shared';

type PropTypes = {
  edit: boolean,
  title: string,
  onChangeTitle: Function,
  type: number,
  onChangeType: Function,
  introduction: string,
  onChangeIntroduction: Function,
  address: string,
  onChangeAddress: Function,
};

export default (props: PropTypes) => (
  <div>
    <H1>{`スペースを${props.edit ? '編集' : '登録'}する`}</H1>
    <Section>
      <H2>どんなスペースを掲載しますか？</H2>
    </Section>
    <Section>
      <SpaceImagePicker />
    </Section>
    <Section>
      <InputForm
        label="特徴がわかるタイトルをつけましょう"
        hint="全角40文字まで。"
        placeholder="例）六本木駅チカで便利です。港区のど真ん中！長期預かりもOKです！"
        value={props.title}
        onChange={e => props.onChangeTitle(e.target.value)}
      />
    </Section>
    <Section>
      <SelectForm
        label="スペースの種類は？"
        options={[
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
    </Section>
    <Section>
      <InputForm
        label="スペースの紹介文"
        hint="スペース情報やあなたができることをアピールしましょう！"
        placeholder="例）家具も入れられるワンルームが余っています。数ヶ月の長期間でも可能です！朝〜夕方までなら荷物の出し入れにも対応できる日もあると思います。"
        multiline
        value={props.introduction}
        onChange={e => props.onChangeIntroduction(e.target.value)}
      />
    </Section>
    <Section>
      <InputForm
        label="所在地はどこ？"
        hint="取引が成立するまで番地以降の住所は表示されません。"
        placeholder="例）東京都杉並区高円寺南 2-48-12"
        value={props.address}
        onChange={e => props.onChangeAddress(e.target.value)}
      />
    </Section>
    <Section>
      <Button primary>次へ</Button>
    </Section>
  </div>
);

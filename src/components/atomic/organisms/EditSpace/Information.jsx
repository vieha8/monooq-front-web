// @flow

import React from 'react';
import { H1, H2 } from 'components/atomic/atoms/Headline';
import EntryButton from 'components/atomic/molecules/EntryButtons';
import InputForm from 'components/atomic/molecules/InputForm';
import SelectForm from 'components/atomic/molecules/SelectForm';
import { Section } from './Shared';

type PropTypes = {
  edit: boolean,
};

export default (props: PropTypes) => (
  <div>
    <H1>{`スペースを${props.edit ? '編集' : '登録'}する`}</H1>
    <Section>
      <H2>どんなスペースを掲載しますか？</H2>
    </Section>
  </div>
);

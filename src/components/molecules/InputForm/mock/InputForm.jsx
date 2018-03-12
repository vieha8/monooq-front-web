// @flow

import React from 'react';

import InputForm from '../index';

export default class HeaderMock extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    const { value } = this.state;
    return (
      <InputForm
        label="エリアや特徴がわかるタイトルをつけましょう"
        hint="全角40文字まで"
        placeholder="例）六本木駅チカで便利です。"
        value={value}
        onChange={e => this.setState({ value: e.target.value })}
      />
    );
  }
}

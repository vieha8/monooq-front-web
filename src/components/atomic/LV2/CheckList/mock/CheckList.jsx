// @flow

import React from 'react';

import CheckList from '../index';

export default class HeaderMock extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      checkedIndexes: {},
    };
  }

  onClickCheck = (clickedIndex: number) => {
    const { checkedIndexes } = this.state;
    checkedIndexes[`${clickedIndex}`] = !checkedIndexes[`${clickedIndex}`];
    this.setState({ checkedIndexes });
  };

  render() {
    const { checkedIndexes } = this.state;
    return (
      <CheckList
        labels={[
          'チェック１チェック１チェック１',
          'チェック２チェック２チェック２',
          'チェック３チェック３チェック３',
        ]}
        checkedIndexes={checkedIndexes}
        onClick={this.onClickCheck}
      />
    );
  }
}

import React from 'react';

import RadioList from '../index';

export default class HeaderMock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIndex: -1,
    };
  }

  onClickRadio = clickedIndex => {
    this.setState({ checkedIndex: clickedIndex });
  };

  render() {
    const { checkedIndex } = this.state;
    return (
      <RadioList
        labels={[
          'ラジオ１ラジオ１ラジオ１',
          'ラジオ２ラジオ２ラジオ２',
          'ラジオ３ラジオ３ラジオ３',
        ]}
        checkedIndex={checkedIndex}
        onClick={this.onClickRadio}
      />
    );
  }
}

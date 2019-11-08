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
        {...this.props}
        value={value}
        onChange={e => this.setState({ value: e.target.value })}
      />
    );
  }
}

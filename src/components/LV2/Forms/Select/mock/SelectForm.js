import React from 'react';

import SelectForm from '../index';

export default class HeaderMock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    const { value } = this.state;
    return (
      <SelectForm
        {...this.props}
        value={value}
        onChange={e => this.setState({ value: e.target.value })}
      />
    );
  }
}

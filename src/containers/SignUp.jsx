import React from 'react';
import { connect } from 'react-redux';

import SignUp from 'components/SignUp';

class SignUpContainer extends React.Component {
  render() {
    return <SignUp step={0} />;
  }
}

export default connect()(SignUpContainer);

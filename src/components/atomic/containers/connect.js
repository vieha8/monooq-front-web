// @flow

import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default (
  OriginalComponent: Component,
  mapStateToProps?: Object,
  mapDispatchToProps?: Object,
) => withRouter(connect(mapStateToProps, mapDispatchToProps)(OriginalComponent));

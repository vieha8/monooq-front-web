import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export default (OriginalComponent, mapStateToProps, mapDispatchToProps) =>
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(OriginalComponent),
  );

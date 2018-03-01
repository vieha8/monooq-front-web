import { connect } from 'react-redux';
import FloatHintButton from 'components/NewSpace/shared/FloatHintButton';

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(FloatHintButton);

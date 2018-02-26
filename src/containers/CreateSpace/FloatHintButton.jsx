import { connect } from 'react-redux';
import FloatHintButton from '../../stories/create-space/shared/FloatHintButton';

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(FloatHintButton);

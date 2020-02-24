import { connect } from 'react-redux';
import { AppState } from '../../../reducers';

const mapStateToProps = (state: AppState) => ({
  authorize: state.authorize.isAuthorize
});

export default connect(mapStateToProps);

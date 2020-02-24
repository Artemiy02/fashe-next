import { connect } from 'react-redux';
import { loginUser } from 'actions/Authorize';
import { AppState } from '../../reducers';

const mapStateToProps = (state: AppState) => ({
  authorize: state.authorize.isAuthorize
});

const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

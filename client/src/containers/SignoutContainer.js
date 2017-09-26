import { signOut } from './../reducers/auth/auth-actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Signout from './../components/auth/signout/Signout'

const mapDispatchToProps = dispatch => ({
  onSignout: () => dispatch(signOut())
});

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signout))
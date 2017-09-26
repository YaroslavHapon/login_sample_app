import { signUpRequest } from './../reducers/auth/auth-actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Register from './../components/auth/register/Register'

const mapDispatchToProps = dispatch => ({
  onRegister: ({ email, password }) => dispatch(signUpRequest({ email, password }))
});

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
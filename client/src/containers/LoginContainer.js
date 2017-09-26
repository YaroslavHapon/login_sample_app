import { loginRequest } from './../reducers/auth/auth-actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './../components/auth/login/Login'

const mapDispatchToProps = dispatch => ({
  onLogin: ({ email, password }) => dispatch(loginRequest({ email, password }))
});

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
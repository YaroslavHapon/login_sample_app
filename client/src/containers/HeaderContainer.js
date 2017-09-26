import Header from './../components/header/Header'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated
});

export default withRouter(connect(mapStateToProps)(Header))

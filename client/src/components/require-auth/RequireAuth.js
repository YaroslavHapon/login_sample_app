import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// PrivateComponent that check if the user is authenticated and return a route or a redirect to the login page
const PrivateRoute = ({ authenticated, component: Component, name, ...rest}) => (
  <Route {...rest} render={props => (
    authenticated ? (<Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location, name } }} />
    )
  )} />
);

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated
});

export default connect(mapStateToProps)(PrivateRoute)
import HeaderContainer from './../containers/HeaderContainer'
import { Route, Switch } from 'react-router-dom'
import RegisterContainer from './../containers/RegisterContainer'
import LoginContainer from './../containers/LoginContainer'
import SignoutConainer from './../containers/SignoutContainer'
import PrivateRoute from './require-auth/RequireAuth'
import Dashboard from './dashboard/Dashboard'

const Test = () => <h1>Testaaa!</h1>;

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

const Profiles = (props) => {
  return <h1>Profiles protected route is here!</h1>
};

export default class App extends React.Component{
  render () {
    return <div>
      <HeaderContainer />
      <Switch>
        <Route exact path="/" component={Test} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/signout" component={SignoutConainer} />
        <PrivateRoute path="/dashboard" component={Dashboard} name="Dashboard"/>
        <PrivateRoute path="/profiles" component={Profiles} name="Profiles"/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  }
}
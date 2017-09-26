import { Field, reduxForm } from 'redux-form'
import Input from './../../controls/input/Input'
import { Redirect } from 'react-router-dom'

class Login extends React.Component{
  onSubmit = data => {
    // // const { email, password } = data;
    // console.log(data.email, data.password);
    this.props.onLogin({ email: data.email, password: data.password });
  }

  render () {
    const { handleSubmit, authentication } = this.props
    // console.log(this.props.location);
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    
    if (authentication.loading) {
      return <h1>Loading!</h1>
    }

    if (authentication.authenticated) {
      return <Redirect to={from}/>
    }

    return(
      <div>
        {this.props.location.state && <div>Please login to see {this.props.location.state.name} 😊</div>}
        <h1>Login!</h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field type="email" name="email" label="Email" placeholder="Enter Email" component={Input} />
          <Field type="password" name="password" label="Password" placeholder="Enter Password" component={Input}/>
          <button type="submit" className="btn btn-primary">Login!</button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required!'
  } else if (!/^[A-Z0-9._+-]+@[A-Z]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid E-mail!'
  }

  if (!values.password) {
    errors.password = 'Required!'
  } else if (values.password.length < 3 || values.password.length > 24 || !/[A-Z]+/.test(values.password)) {
    errors.password = 'Invalid Password!'
  }

  return errors;
};

export default reduxForm({ form: 'login', validate })(Login)

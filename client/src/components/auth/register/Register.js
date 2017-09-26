import { Field, reduxForm } from 'redux-form'
import Input from './../../controls/input/Input'
import { Redirect } from 'react-router-dom'

class Register extends React.Component{
  onSubmit = data => {
    this.props.onRegister({ email: data.email, password: data.password });
  }

  render () {
    const { handleSubmit, authentication } = this.props;

    if (authentication.authenticated) {
      return <Redirect to='/dashboard' />
    }

    return(
      <div>
        <h1>Register!</h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field type="email" name="email" label="Email" placeholder="Enter Email" component={Input} />
          <Field type="password" name="password" label="Password" placeholder="Enter Password" component={Input} />
          <Field type="password" name="passwordConfirm" label="Confirm Password" placeholder="Confirm Password" component={Input} />
          <button type="submit" className="btn btn-primary">Register!</button>
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

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Required!'
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords should match!'
  }

  return errors;
};

export default reduxForm({ form: 'register' })(Register)

import PropTypes from 'prop-types'

export default class Signout extends React.Component{
  static propTypes = {
    onSignout: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.onSignout();
  }

  render () {
    return (
      <div>You are signed out! You should login to see protected resources!</div>
    )
  }
}
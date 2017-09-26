import Api from './../../service/Api'

export default class Dashboard extends React.Component{
  componentWillMount () {
    Api.fetchMessage();
  }

  render () {
    return(
      <div>Protected Dashboard!</div>
    )
  }
}
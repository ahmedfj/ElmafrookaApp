import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './SignIn.css'
import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value.toLowerCase()
  })

  onSignIn = event => {
    event.preventDefault()
    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="in-cont">
      <form className='auth-form' onSubmit={this.onSignIn}>
        <h3>تسجيل الدخول</h3>
        <label htmlFor="email">البريد الإلكتروني</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">كلمة المرور</label>
        <input
          required
          autoComplete="on"
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button className="btn btn-primary" type="submit">تسجيل دخول</button>
      </form>
      </div>
    )
  }
}

export default withRouter(SignIn)

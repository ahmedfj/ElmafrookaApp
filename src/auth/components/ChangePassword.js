import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form className='auth-form' onSubmit={this.onChangePassword}>
        <h3>تغيير كلمة المرور</h3>

        <label htmlFor="oldpw">كلمة المرور</label>
        <input
          required
          style={{padding:"0 15px", borderRadius:"3px",border:"1px solid #e6e3e3"}}
          name="oldPassword"
          value={oldPassword}
          type="password"
          placeholder="كلمة المرور"
          onChange={this.handleChange}
        />
        <label htmlFor="newPassword">كلمة المرور الجديدة</label>
        <input
         style={{padding:"0 15px", borderRadius:"3px",border:"1px solid #e6e3e3"}}
          required
          name="newPassword"
          value={newPassword}
          type="password"
          placeholder="كلمة المرور الجديدة"
          onChange={this.handleChange}
        />
        <button className="btn btn-primary" type="submit">تغيير كلمة المرور</button>
      </form>
    )
  }
}

export default withRouter(ChangePassword)

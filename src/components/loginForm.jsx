import React, { Component } from "react"
import Input from "../components/common/input"
import Joi from "joi-browser"

export default class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  }

  handleSubmit = e => {
    e.preventDefault()
    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return
    console.log("Submited!")
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateOnChange(input)
    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const account = {
      ...this.state.account
    }
    account[input.name] = input.value

    this.setState({ account, errors })
  }

  validate = () => {
    const { account } = this.state
    const errors = {}

    return Object.keys(errors).length === 0 ? null : errors
  }

  validateOnChange = input => {
    if (input.name === "username") {
      if (input.value.length < 3)
        return "Username must be at least 3 characters long."
    }
    if (input.name === "password") {
      if (input.value.length < 5)
        return "Password must be at least 5 characters long."
    }
  }

  render() {
    const { account, errors } = this.state
    return (
      <div>
        <h1>Login Form</h1>
        <form className="my-5" onSubmit={this.handleSubmit}>
          <Input
            value={account.username}
            name={"username"}
            id={"username"}
            label={"Username"}
            onChange={this.handleChange}
            type={"email"}
            error={errors.username}
          />
          <Input
            value={account.password}
            name={"password"}
            id={"password"}
            label={"Password"}
            onChange={this.handleChange}
            type={"password"}
            error={errors.password}
          />

          <button type="submit" className="btn btn-secondary btn-block my-5">
            Login
          </button>
        </form>
      </div>
    )
  }
}

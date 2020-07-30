import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signin extends Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push("/dashboard");
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="wrap">
          <form className="login-form" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="form-header">
              <h3>Login Form</h3>
              <p>Login to access your dashboard</p>
            </div>
            <fieldset className="form-group">
              <label>Username:</label>
              <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
                className="form-input"
              />
            </fieldset>
            <fieldset className="form-group">
              <label>Password:</label>
              <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
                className="form-input"
              />
            </fieldset>
            <div>{this.props.errorMessage}</div>
            <div className="form-group">
              <div>
                <input type="checkbox" /> Keep me Login
              </div>
              <button className="form-button" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(Signin);

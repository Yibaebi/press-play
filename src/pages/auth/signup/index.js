import { register } from "../../../api";
import { Button, Input } from "../../../components";
import { AuthenticationPage, captureUserDetails } from "../authPages";
import { AuthNavBar } from "../../../widgets";
import "./signup.css";
import { Link } from "react-router-dom";
import { IconLoader } from "../../../utilities/loader";

class SignUpPage extends AuthenticationPage {
  state = {
    account: {
      userEmail: "",
      userPassword: "",
      userFirstName: "",
      userLastName: "",
    },
    checked: false,
    errors: {},
    iconChange: "far fa-eye",
    passwordType: "password",
    loading: "",
  };

  handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validateDetails();
    this.setState({
      errors,
    });

    console.log(this.state.errors);

    const account = { ...this.state.account };

    if (
      account.userEmail &&
      account.userPassword &&
      account.userFirstName &&
      account.userLastName
    ) {
      const userDetails = captureUserDetails(
        account.userEmail.toLocaleLowerCase(),
        account.userPassword,
        account.userLastName,
        account.userFirstName
      );
      try {
        let response = await register(userDetails);

        console.log(response.data);

        this.setState({
          loading: (
            <IconLoader loadingMessage="Check your email for an activation link." />
          ),
        });

        setTimeout(() => {
          window.location = "/login";
        }, 3000);
      } catch (ex) {
        if (ex.response) {
          const errors = { ...this.state.errors };
          errors.userEmail = ex.response.data.message;
          this.setState({ errors: errors });
        }
      }
    }
  };

  render() {
    const errors = { ...this.state.errors };
    const account = { ...this.state.account };

    return (
      <main className="auth-page-main">
        <section className="auth-page-header">
          <AuthNavBar buttonLabel="Login" link="/login" />
        </section>
        <section className="auth-page-body">
          <aside>
            <div className="signup-intro">
              <h1>Sign me up!</h1>
              <p>
                If you have an account <Link to="/login">Login</Link> here
              </p>
            </div>
            <div>
              <form
                className="signup-form"
                onSubmit={(e) => this.handleSignUpSubmit(e)}
              >
                <Input
                  onChange={this.handleInputChange}
                  value={account.userEmail}
                  labelClassName="login-form-label"
                  type="email"
                  label="Email address"
                  name="userEmail"
                  placeHolder="email@domain.com"
                  error={errors.userEmail}
                />
                <Input
                  onChange={this.handleInputChange}
                  value={account.userFirstName}
                  labelClassName="login-form-label"
                  type="text"
                  label="Firstname"
                  name="userFirstName"
                  placeHolder="Please enter your firstname"
                  error={errors.userFirstName}
                />
                <Input
                  onChange={this.handleInputChange}
                  value={account.userLastName}
                  labelClassName="login-form-label"
                  type="text"
                  label="Lastname"
                  name="userLastName"
                  placeHolder="Please enter your lastname"
                  error={errors.userLastName}
                />

                <Input
                  onChange={this.handleInputChange}
                  value={account.userPassword}
                  labelClassName="login-form-label label-password"
                  type={this.state.passwordType}
                  label="Password"
                  name="userPassword"
                  placeHolder="Type your password"
                  error={errors.userPassword}
                  iconClass={this.state.iconChange}
                  iconChange={this.handleHidePassword}
                />

                <Button
                  disabled={this.validateDetails()}
                  type="submit"
                  label="Sign Up"
                  className="signup-button"
                />
              </form>
            </div>
          </aside>
          <aside>
            <section>
              <div></div>
            </section>
          </aside>
        </section>
        {this.state.loading}
      </main>
    );
  }
}

export { SignUpPage };

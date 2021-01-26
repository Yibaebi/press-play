import { register } from "../../../api";
import { Button, Input } from "../../../components";
import { AuthenticationPage, captureUserDetails } from "../authPages";
import { AuthNavBar } from "../../../widgets";
import "./signup.css";
import { Link } from "react-router-dom";

class SignUpPage extends AuthenticationPage {
  state = {
    account: { userEmail: "", userPassword: "", userName: "" },
    checked: false,
    errors: {},
    iconChange: "far fa-eye",
    passwordType: "password",
  };

  handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validateDetails();
    this.setState({
      errors,
    });

    console.log(this.state.errors);

    const account = { ...this.state.account };

    if (account.userEmail && account.userPassword && account.userName) {
      const userDetails = captureUserDetails(
        account.userEmail.toLocaleLowerCase(),
        account.userPassword,
        account.userName
      );
      console.log("UserDetails", userDetails);
      try {
        await register(userDetails);
        this.props.history.push("/login");
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.userEmail = ex.response.data.error;
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
          <AuthNavBar />
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
                  labelClassName="signup-form-label"
                  type="email"
                  label="Email address"
                  name="userEmail"
                  placeHolder="email@domain.com"
                  error={errors.userEmail}
                />
                <Input
                  onChange={this.handleInputChange}
                  value={account.userName}
                  labelClassName="signup-form-label"
                  type="text"
                  label="Username"
                  name="userName"
                  placeHolder="Please enter your username"
                  error={errors.userName}
                />

                <Input
                  onChange={this.handleInputChange}
                  value={account.userPassword}
                  labelClassName="signup-form-label label-password"
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
              {/* <div>
                <h1>Hello Friend!</h1>
                <p>Host listen and enjoy different podcasts on the go...</p>
              </div> */}
            </section>
          </aside>
        </section>
      </main>
    );
  }
}

export { SignUpPage };

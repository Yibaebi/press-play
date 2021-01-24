import { register } from "../../../api";
import { primaryLogo } from "../../../assets";
import { Button, Input } from "../../../components";
import { AuthenticationPage, captureUserDetails } from "../authPages";

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
        const response = await register(userDetails);
        console.log("Register", response.data.message);
      } catch (ex) {
        if (ex.response && ex.response.status === 409) {
          const errors = { ...this.state.errors };
          errors.userEmail = ex.response.data.message;
          this.setState({ errors: errors });
        }
      }
    } else {
      // revertUserDetails();
    }
  };

  render() {
    const errors = { ...this.state.errors };
    const account = { ...this.state.account };

    return (
      <main className="auth-page-main">
        <section className="auth-page-header">
          <div className="header-container">
            <img src={primaryLogo} alt="pressplay logo" />
          </div>
        </section>
        <section className="auth-page-body">
          <aside>
            <div className="signup-intro">
              <h1>Sign me up!</h1>
              <p>
                If you have an account <a href="#browsepodcasts">Login</a> here
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

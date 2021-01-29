import React from "react";
import ReactModal from "react-modal";
import { NavLink, Route, Switch } from "react-router-dom";
import {
  dashboardIcon,
  favIcon,
  hamburgerUnclicked,
  homeIcon,
  primaryLogo,
  settingsIcon,
} from "../../../assets";

import "./userProfile.css";
import { DashboardNavBar, UploadModal } from "../../../widgets";
import { UserDashboard } from "../dashboard";
import Home from "../home/index";
import { Logout } from "../../auth/logout";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showUploadModal: false,
      iconColor: "#656565",
      iconFocusColor: "#e2514c",
      isInView: "",
    };
  }

  handleModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };

  handleUploadModalOpen = () => {
    this.setState({
      showUploadModal: true,
    });
  };

  hideUploadModal = () => {
    this.setState({
      showUploadModal: false,
    });
  };

  handleModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleIconChange = (e, linkTo) => {
    this.setState((state) => ({ ...state, isInView: linkTo }));
  };

  render() {
    const { isInView, iconColor, iconFocusColor } = this.state;
    return (
      <React.Fragment>
        <div id="sidebar-wrapper">
          <div id="sidebar-nav-wrapper">
            <DashboardNavBar
              handleModalOpen={this.handleModalOpen}
              user={this.props.user}
            />
          </div>
          <Switch>
            <Route path="/user/dashboard" component={UserDashboard} />
            <Route exact path="/" component={Home} />
            <Route exact path="/logout" component={Logout} />
          </Switch>

          <UploadModal
            showModal={this.state.showUploadModal}
            closeModal={this.hideUploadModal}
          />
          <ReactModal
            isOpen={this.state.showModal}
            className="sidebar-modal"
            overlayClassName="sidebar-overlay"
            onRequestClose={this.handleModalClose}
          >
            <div className="sidebar-modal-wrapper">
              <div className="logo-container open-shadow">
                <NavLink
                  onClick={this.handleModalClose}
                  className="hamburger"
                  to="/"
                >
                  <img src={hamburgerUnclicked} alt="pressplay logo" />
                </NavLink>
                <NavLink to="/">
                  <img
                    src={primaryLogo}
                    className="pressplay-logo"
                    alt="pressplay logo"
                  />
                </NavLink>
              </div>
              <ul className="sidebar-links">
                <li>
                  <NavLink
                    to="/"
                    activeClassName="sidebar-active"
                    onClick={(e) => this.handleIconChange(e, "home")}
                  >
                    {homeIcon(isInView === "home" ? iconFocusColor : iconColor)}
                    <span>Home</span>
                  </NavLink>
                </li>
                {/* <li onClick={(e) => this.handleIconChange(e, "subscription")}>
                  <Nav.Link
                    to="/subscription"
                    disabled={true}
                    activeClassName="sidebar-active"
                    >
                    {rssIcon(
                      isInView === "subscription" ? iconFocusColor : iconColor
                      )}
                    <span>Subscriptions</span>
                    </Nav.Link>
                  </li> */}
                {this.props.user && (
                  <li onClick={(e) => this.handleIconChange(e, "dashboard")}>
                    <NavLink
                      to="/user/dashboard"
                      activeClassName="sidebar-active"
                    >
                      {dashboardIcon(
                        isInView === "dashboard" ? iconFocusColor : iconColor
                      )}
                      <span>Dashboard</span>
                    </NavLink>
                  </li>
                )}
                {!this.props.user && (
                  <li onClick={(e) => this.handleIconChange(e, "login")}>
                    <NavLink
                      to="/login"
                      disabled={true}
                      activeClassName="sidebar-active"
                    >
                      {favIcon(
                        isInView === "login" ? iconFocusColor : iconColor
                      )}
                      <span>Login </span>
                    </NavLink>
                  </li>
                )}
                {/* <li onClick={(e) => this.handleIconChange(e, "settings")}>
                  <Nav.Link
                    to="/settings"
                    disabled={true}
                    activeClassName="sidebar-active diasbled"
                  >
                    {settingsIcon(iconColor)}
                    <span>Settings</span>
                  </Nav.Link>
                </li> */}
                {this.props.user && (
                  <li onClick={(e) => this.handleIconChange(e, "logout")}>
                    <NavLink to="/logout" activeClassName="sidebar-active">
                      {settingsIcon(
                        isInView === "logout" ? iconFocusColor : iconColor
                      )}
                      <span>Logout</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </ReactModal>
        </div>
      </React.Fragment>
    );
  }
}

export { Dashboard };

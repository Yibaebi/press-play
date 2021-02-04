import React from "react";
import ReactModal from "react-modal";
import { NavLink, Route, Switch } from "react-router-dom";
import {
  dashboardIcon,
  hamburgerUnclicked,
  homeIcon,
  logoutIcon,
  primaryLogo,
} from "../../../assets";

import "./userProfile.css";
import { DashboardNavBar, UploadModal } from "../../../widgets";
import { UserDashboard } from "../dashboard";

import { Logout } from "../../auth/logout";
import { Home } from "../";

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

  componentDidMount() {
    this.setState({
      isInView: "home",
    });
  }

  handleModalOpen = () => {
    this.setState({
      showModal: true,
    });
  };
  showPodcastModal = () => {
    this.setState({
      showPodcastModal: true,
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
            <Route
              path="/dashboard/home"
              render={(props) => <Home user={this.props.user} {...props} />}
            />
            <Route
              path="/dashboard/dashboard"
              render={(props) => (
                <UserDashboard
                  user={this.props.user}
                  userDetails={this.props.userDetails}
                  uploadModal={this.showPodcastModal}
                  {...props}
                />
              )}
            />
            <Route path="/logout" component={Logout} />
          </Switch>

          <UploadModal
            uploadPodcast={false}
            show={false}
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
                <img
                  onClick={this.handleModalClose}
                  src={hamburgerUnclicked}
                  alt="pressplay logo"
                />

                <NavLink to="/dashboard/home">
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
                    to="/dashboard/home"
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
                      to="/dashboard/dashboard"
                      activeClassName="sidebar-active"
                    >
                      {dashboardIcon(
                        isInView === "dashboard" ? iconFocusColor : iconColor
                      )}
                      <span>Dashboard</span>
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
                {this.props.user ? (
                  <li onClick={(e) => this.handleIconChange(e, "logout")}>
                    <NavLink to="/logout" activeClassName="sidebar-active">
                      {logoutIcon(
                        isInView === "logout" ? iconFocusColor : iconColor
                      )}
                      <span>Logout</span>
                    </NavLink>
                  </li>
                ) : (
                  <li onClick={(e) => this.handleIconChange(e, "login")}>
                    <NavLink to="/login" activeClassName="sidebar-active">
                      {logoutIcon(
                        isInView === "login" ? iconFocusColor : iconColor
                      )}
                      <span>Login</span>
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

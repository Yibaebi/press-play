import React from "react";
import ReactModal from "react-modal";
import { NavLink } from "react-router-dom";
import {
  dashboardIcon,
  favIcon,
  hamburgerUnclicked,
  homeIcon,
  primaryLogo,
  rssIcon,
  settingsIcon,
  draftIcon,
  uploadIcon,
  subscribersIcon,
  likesIcon,
  listeningIcon,
} from "../../../assets";

import "./dashboard.css";
import { DashboardNavBar, UploadModal } from "../../../widgets";

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

    this.modalRef = React.createRef();
  }

  // componentDidMount() {
  //   const modalRef = this.modalRef.current;
  //   console.log(modalRef);
  //   gsap.to(modalRef, { opacity: 1, duration: 1 });
  // }

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
      <div id="sidebar-wrapper">
        <div id="sidebar-nav-wrapper">
          <DashboardNavBar handleModalOpen={this.handleModalOpen} />
        </div>
        <main className="dashboard-main-container">
          <div className="content-wrapper">
            <h2>Welcome to your dashboard!</h2>
            <h4>
              Find all about your audience, content analytics, and manage your
              podcasts.
            </h4>
            <section>
              <section className="dashboard-analytics">
                <aside className="analytics-box podcasts">
                  {listeningIcon()}
                  <div className="content">
                    <p>1000</p>
                    <p>Podcasts</p>
                  </div>
                </aside>
                <aside className="analytics-box subscribers">
                  {subscribersIcon()}
                  <div className="content">
                    <p>2000</p>
                    <p>Subscribers</p>
                  </div>
                </aside>
                <aside className="analytics-box likes">
                  {likesIcon()}
                  <div className="content">
                    <p>100K</p>
                    <p>Likes</p>
                  </div>
                </aside>
              </section>
              <section className="upload-box">
                <h4>Start uploading here!</h4>
                <div className="upload-content">
                  <button
                    className="upload"
                    onClick={this.handleUploadModalOpen}
                  >
                    {uploadIcon()}Upload podcast
                  </button>
                  <button className="draft">{draftIcon()}Draft</button>
                </div>
              </section>
            </section>
            {/* <button className="upload update-profile">Update profile</button> */}
          </div>
        </main>
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
                  to="/home"
                  activeClassName="sidebar-active"
                  onClick={(e) => this.handleIconChange(e, "home")}
                >
                  {homeIcon(isInView === "home" ? iconFocusColor : iconColor)}
                  <span>Home</span>
                </NavLink>
              </li>
              <li onClick={(e) => this.handleIconChange(e, "favourites")}>
                <NavLink to="/favourites" activeClassName="sidebar-active">
                  {favIcon(
                    isInView === "favourites" ? iconFocusColor : iconColor
                  )}
                  <span>Favourites </span>
                </NavLink>
              </li>
              <li onClick={(e) => this.handleIconChange(e, "subscription")}>
                <NavLink to="/subscription" activeClassName="sidebar-active">
                  {rssIcon(
                    isInView === "subscription" ? iconFocusColor : iconColor
                  )}
                  <span>Subscriptions</span>
                </NavLink>
              </li>
              <li onClick={(e) => this.handleIconChange(e, "dashboard")}>
                <NavLink to="/dashboard" activeClassName="sidebar-active">
                  {dashboardIcon(
                    isInView === "dashboard" ? iconFocusColor : iconColor
                  )}
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li onClick={(e) => this.handleIconChange(e, "settings")}>
                <NavLink to="/settings" activeClassName="sidebar-active">
                  {settingsIcon(
                    isInView === "settings" ? iconFocusColor : iconColor
                  )}
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export { Dashboard };

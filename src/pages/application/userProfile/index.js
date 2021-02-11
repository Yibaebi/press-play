import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import {
  dashboardIcon,
  favIcon,
  homeIcon,
  logoutIcon,
  rssIcon,
} from "../../../assets";

import "./userProfile.css";
import { DashboardNavBar, UploadModal } from "../../../widgets";
import { UserDashboard } from "../dashboard";

import { Logout } from "../../auth/logout";
import { Home } from "../";
import { AudioPlayer } from "./../../../utilities/audioPlayer/index";
import { SubscriptionsPage } from "../Subscription";
import { FavoritesPage } from "../favoritesPage";
import { getAPodcast } from "../../../api";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showUploadModal: false,
      iconColor: "#656565",
      iconFocusColor: "#e2514c",
      isInView: "",

      // Player details
      launchPlayer: false,
      episodeDetails: {},
      podcastDetails: {},
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

  handlePlayerLaunch = (episode, podcastDetails) => {
    console.log("Received episode", episode);
    const episodeDetails = episode;
    this.setState({
      launchPlayer: true,
      favoritesLaunch: false,
      episodeDetails,
      podcastDetails,
    });
  };

  handleFavoritesPlayerLaunch = async (episode, podcastId) => {
    console.log("Received podcastId", podcastId);
    this.setState({
      favoritesLaunch: false,
    });

    try {
      const episodeDetails = episode;
      const podcastResponse = await getAPodcast(podcastId);
      console.log("Podcast to be played", podcastResponse.data);

      if (podcastResponse.status) {
        this.setState({
          launchPlayer: false,
          favoritesLaunch: true,
          episodeDetails,
          favoritesPodcastDetails: podcastResponse.data,
        });
      }
    } catch (error) {}
  };

  render() {
    const { isInView, iconColor, iconFocusColor } = this.state;
    return (
      <React.Fragment>
        <div id="main-wrapper">
          <nav id="sidebar-nav-wrapper">
            <DashboardNavBar user={this.props.user} />
          </nav>
          <main className="main-body">
            <section id="sidebar-nav-links">
              <div
                isOpen={true}
                className="sidebar-modal"
                overlayClassName="sidebar-overlay"
                onRequestClose={this.handleModalClose}
              >
                <div className="sidebar-modal-wrapper">
                  <ul className="sidebar-links">
                    <li>
                      <NavLink
                        to="/dashboard/discover"
                        activeClassName="sidebar-active"
                        onClick={(e) => this.handleIconChange(e, "discover")}
                      >
                        {homeIcon(
                          isInView === "discover" ? iconFocusColor : iconColor
                        )}
                        <span>Discover</span>
                      </NavLink>
                    </li>
                    {this.props.user && (
                      <li
                        onClick={(e) =>
                          this.handleIconChange(e, "subscriptions")
                        }
                      >
                        <NavLink
                          to="/dashboard/subscriptions"
                          activeClassName="sidebar-active"
                        >
                          {rssIcon(
                            isInView === "subscriptions"
                              ? iconFocusColor
                              : iconColor
                          )}
                          <span>Subscriptions</span>
                        </NavLink>
                      </li>
                    )}

                    {this.props.user && (
                      <li
                        onClick={(e) => this.handleIconChange(e, "favorites")}
                      >
                        <NavLink
                          to="/dashboard/favorites"
                          activeClassName="sidebar-active"
                        >
                          {favIcon(
                            isInView === "favorites"
                              ? iconFocusColor
                              : iconColor
                          )}
                          <span>Favorites</span>
                        </NavLink>
                      </li>
                    )}

                    {this.props.user && (
                      <li
                        onClick={(e) => this.handleIconChange(e, "dashboard")}
                      >
                        <NavLink
                          to="/dashboard/dashboard"
                          activeClassName="sidebar-active"
                        >
                          {dashboardIcon(
                            isInView === "dashboard"
                              ? iconFocusColor
                              : iconColor
                          )}
                          <span>Dashboard</span>
                        </NavLink>
                      </li>
                    )}

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
              </div>
            </section>
            <Switch>
              <Route
                path="/dashboard/discover"
                render={(props) => (
                  <Home
                    user={this.props.user}
                    playerLaunch={this.handlePlayerLaunch}
                    {...props}
                  />
                )}
              />
              <Route
                path="/dashboard/subscriptions"
                render={(props) => (
                  <SubscriptionsPage
                    user={this.props.user}
                    playerLaunch={this.handlePlayerLaunch}
                    {...props}
                  />
                )}
              />
              <Route
                path="/dashboard/favorites"
                render={(props) => (
                  <FavoritesPage
                    playerLaunch={this.handleFavoritesPlayerLaunch}
                    {...props}
                  />
                )}
              />
              <Route
                path="/dashboard/dashboard"
                render={(props) => (
                  <UserDashboard
                    user={this.props.user}
                    userDetails={this.props.userDetails}
                    uploadModal={this.showPodcastModal}
                    playerLaunch={this.handlePlayerLaunch}
                    {...props}
                  />
                )}
              />
              <Route path="/logout" component={Logout} />
            </Switch>
          </main>
          <UploadModal
            uploadPodcast={false}
            show={false}
            closeModal={this.hideUploadModal}
          />
        </div>
        {Object.keys(this.state.episodeDetails).length && (
          <AudioPlayer
            launchPlayer={this.state.launchPlayer}
            episodeDetails={this.state.episodeDetails}
            podcastDetails={this.state.podcastDetails}
          />
        )}
        {this.state.favoritesLaunch && (
          <AudioPlayer
            launchPlayer={this.state.favoritesLaunch}
            favoritesPlayer={true}
            episodeDetails={this.state.episodeDetails}
            podcastDetails={this.state.favoritesPodcastDetails}
            playingEpisoe={true}
          />
        )}
      </React.Fragment>
    );
  }
}

export { Dashboard };

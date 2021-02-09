import React from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import "./dashboard.css";
import { NavLink } from "react-router-dom";
import {
  uploadIcon,
  listeningIcon,
  subscribersIcon,
  likesIcon,
  recommendation1,
  angleRightIcon,
} from "../../../assets";
import { UploadModal } from "../../../widgets";
import { IconLoader } from "../../../utilities";

class UserDashboard extends React.Component {
  state = {
    userDetails: {},
    showUploadEditModal: false,
    uploadPodcast: false,
    showEpisodePodcast: true,
    createInProgress: false,
    createSuccess: false,
  };

  async componentDidMount() {
    console.log(this.props.userDetails);
    this.setState({
      userDetails: this.props.userDetails,
    });
  }

  handleShowUploadEditModal = () => {
    console.log("User Details:", this.state.userDetails);
    this.setState({
      showUploadEditModal: true,
      uploadPodcast: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showUploadEditModal: false,
      uploadPodcast: false,
    });
  };

  handlePodcastCreation = (inProgress, completed) => {
    this.setState({
      createInProgress: inProgress,
      createSuccess: completed,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row id="home">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link id="user-dashboard-nav-item" eventKey="first">
                  Overview
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">View Podcasts</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <main className="dashboard-main-container">
                  <div className="content-wrapper">
                    <h2>Welcome to your dashboard!</h2>
                    <h4>
                      Find all about your audience, content analytics, and
                      manage your podcasts.
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
                            onClick={this.handleShowUploadEditModal}
                          >
                            {uploadIcon()}Create podcast
                          </button>

                          {this.state.createInProgress && (
                            <div className="podcast-success-message">
                              {this.state.createSuccess ? (
                                <h4>
                                  <i className="fas fa-check-square"></i>{" "}
                                  Podcast created successfully
                                </h4>
                              ) : (
                                <div id="podcast-creation-loader">
                                  <IconLoader />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </section>
                    </section>
                  </div>
                </main>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <main className="dashboard-main-container view-podcasts">
                  <div className="content-wrapper">
                    <div className="podcast-listing-main-container">
                      <section>
                        <aside
                          id="podcast-listing-wrapper"
                          className="podcast-listing header"
                        >
                          <h2>Here are all your podcasts</h2>
                          <div className="podcast-listing-container ">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <span className="header-select-all">
                                Select All
                              </span>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                          </div>
                          <div className="podcast-listing-container">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <div className="image-container">
                                <img src={recommendation1} alt="" />
                                <p>Skip the repeat</p>
                              </div>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                            <NavLink to="/dashboard/dashboard">
                              View more {angleRightIcon()}
                            </NavLink>
                          </div>
                          <div className="podcast-listing-container">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <div className="image-container">
                                <img src={recommendation1} alt="" />
                                <p>Skip the repeat</p>
                              </div>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                            <NavLink to="/dashboard/dashboard">
                              View more {angleRightIcon()}
                            </NavLink>
                          </div>
                          <div className="podcast-listing-container">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <div className="image-container">
                                <img src={recommendation1} alt="" />
                                <p>Skip the repeat</p>
                              </div>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                            <NavLink to="/dashboard/dashboard">
                              View more {angleRightIcon()}
                            </NavLink>
                          </div>
                          <div className="podcast-listing-container">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <div className="image-container">
                                <img src={recommendation1} alt="" />
                                <p>Skip the repeat</p>
                              </div>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                            <NavLink to="/dashboard/dashboard">
                              View more {angleRightIcon()}
                            </NavLink>
                          </div>{" "}
                          <div className="podcast-listing-container">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <div className="image-container">
                                <img src={recommendation1} alt="" />
                                <p>Skip the repeat</p>
                              </div>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                            <NavLink to="/dashboard/dashboard">
                              View more {angleRightIcon()}
                            </NavLink>
                          </div>{" "}
                          <div className="podcast-listing-container">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <div className="image-container">
                                <img src={recommendation1} alt="" />
                                <p>Skip the repeat</p>
                              </div>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                            <NavLink to="/dashboard/dashboard">
                              View more {angleRightIcon()}
                            </NavLink>
                          </div>{" "}
                          <div className="podcast-listing-container">
                            <label htmlFor="selectAllPodcasts">
                              <input
                                type="checkbox"
                                name="selectAllPodcasts"
                                id=""
                              />
                              <div className="image-container">
                                <img src={recommendation1} alt="" />
                                <p>Skip the repeat</p>
                              </div>
                            </label>

                            <p>Date added</p>
                            <p>likes</p>
                            <NavLink to="/dashboard/dashboard">
                              View more {angleRightIcon()}
                            </NavLink>
                          </div>
                        </aside>
                      </section>
                    </div>
                  </div>
                </main>
              </Tab.Pane>
              <Tab.Pane eventKey="third">Third</Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
        <UploadModal
          podcastDetails={this.state.podcastDetails}
          show={this.state.showUploadEditModal}
          uploadPodcast={this.state.uploadPodcast}
          userId={this.state.userDetails._id}
          closeModal={this.handleCloseModal}
          createSuccess={this.handlePodcastCreation}
        />
      </React.Fragment>
    );
  }
}

export { UserDashboard };

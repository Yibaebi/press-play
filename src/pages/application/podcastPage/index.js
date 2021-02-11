import React, { Component } from "react";
import "./podcastPage.css";
import {
  deleteEpisode,
  deletePodcast,
  getAllEpisodesOfAPodcast,
  getAPodcast,
  subscribeToAPodcast,
  getAllUserSubscriptions,
  unsubscribeToAPodcast,
} from "../../../api/auth";
import { NavLink } from "react-router-dom";
import { UploadModal } from "../../../widgets";
import {
  episodePlayIcon,
  goBackIcon,
  episodeDeleteIcon,
  episodeEditIcon,
  subscribeIcon,
} from "../../../assets";
import { IconLoader } from "../../../utilities";
import { EpisodeUploadModal } from "../../../widgets/episodeUploadModal";

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
console.log(userDetails);

const checkIfPodcastIsSubscribedTo = (podcastId, subscriptionList) => {
  for (let podcast of subscriptionList) {
    if (podcastId === podcast._id) {
      return true;
    } else {
      continue;
    }
  }
  return false;
};

class PodcastPage extends Component {
  state = {
    podcastDetails: {},
    episodes: [],
    loading: null,
    showUploadEditModal: false,
    episodeEditIntention: false,
    uploadPodcast: false,
    episodeEditModal: false,
    showEpisodePodcast: true,
    uploadPodcastDetails: {},
    deleteStaging: false,
    deletePodcast: false,
    deleteLoading: false,
    deleted: false,
    episodeDeleting: false,
    subscribed: false,
    episodeDetails: {},
    episodeUpload: false,
    episodeId: "",
  };

  handleEpisodeUploadModal = () => {
    this.setState({
      episodeUpload: true,
    });
  };
  handleEpisodeEditModal = (e, episode) => {
    console.log("Current Episode", episode);
    this.setState({
      episodeDetails: episode,
      episodeEditModal: true,
      showEpisodePodcast: false,
      episodeId: episode._id,
    });
  };

  handleShowUploadEditModal = (e, podcastDetails) => {
    this.setState({
      showUploadEditModal: true,
      uploadPodcast: true,
      uploadPodcastDetails: podcastDetails,
    });
  };

  handleCloseModal = () => {
    this.setState({
      showUploadEditModal: false,
      episodeEditModal: false,
      uploadPodcast: false,
      episodeUpload: false,
    });
  };
  handleDeletePodcast = async () => {
    this.setState({
      deleteLoading: true,
      deletePodcast: false,
    });

    alert(this.state.podcastDetails._id);

    try {
      const deleteResponse = await deletePodcast(this.state.podcastDetails._id);
      console.log("Delete Response", deleteResponse.data);
      if (deleteResponse.status) {
        this.setState({
          deleteLoading: false,
          deleted: true,
        });
      }
      setTimeout(() => {
        window.location = "/dashboard/home";
      }, 3000);
    } catch (error) {}
  };

  deletePodcast = () => {
    this.setState({
      deletePodcast: true,
    });
  };

  stopDeletePodcast = () => {
    this.setState({
      deletePodcast: false,
    });
  };

  async componentDidMount() {
    try {
      if (userDetails !== null) {
        const userSubscriptions = await getAllUserSubscriptions();
        console.log("Here are your subscriptions", userSubscriptions.data.data);

        const subscribeStatus = checkIfPodcastIsSubscribedTo(
          this.props.podcastId,
          userSubscriptions.data.data
        );

        const podcastResponse = await getAPodcast(this.props.podcastId);
        console.log("Podcast Details", podcastResponse);
        this.setState({
          loading: false,
        });
        const episodes = await getAllEpisodesOfAPodcast(this.props.podcastId);
        console.log("Episodes", episodes.data);

        if (podcastResponse.data && episodes.data) {
          this.setState({
            subscribed: subscribeStatus,
            loading: true,
            podcastDetails: podcastResponse.data,
            episodes: episodes.data,
          });
        }
      } else {
        const podcastResponse = await getAPodcast(this.props.podcastId);
        console.log("Podcast Details", podcastResponse);
        this.setState({
          loading: false,
        });
        const episodes = await getAllEpisodesOfAPodcast(this.props.podcastId);
        console.log("Episodes", episodes.data);

        if (podcastResponse.data && episodes.data) {
          this.setState({
            loading: true,
            podcastDetails: podcastResponse.data,
            episodes: episodes.data,
          });
        }
      }
    } catch (error) {}
  }

  updateEpisodeDetails = (newEpisodes) => {
    console.log("Received New Episodes", newEpisodes);

    this.setState({
      newBadge: true,
      episodes: newEpisodes,
    });

    setTimeout(() => {
      this.setState({
        newBadge: false,
      });
    }, 20000);
  };

  handleEpisodeDelete = async (e, episodeId) => {
    this.setState({
      episodeDeleting: true,
    });

    try {
      const deleteResponse = await deleteEpisode(episodeId);
      console.log(deleteResponse);

      if (deleteResponse.status) {
        const newEpisodes = await getAllEpisodesOfAPodcast(
          this.state.podcastDetails._id
        );

        this.setState({
          episodeDeleting: false,
          episodeDeleted: false,
          episodeDeleteDialog: false,
          episodes: newEpisodes.data,
        });
      }
    } catch (error) {}
  };

  handleEpisodeDeleteDialog = (e, episodeId) => {
    this.setState({
      episodeDeleteDialog: true,
      episodeId,
    });
  };

  subscribeToPodcast = async (e, podcastDetails) => {
    console.log("Can subscribe to", podcastDetails);
    if (e.target.innerText === "Subscribe") {
      try {
        const subscribeResponse = await subscribeToAPodcast(podcastDetails._id);

        const podcastResponse = await getAPodcast(this.props.podcastId);

        if (subscribeResponse.status && podcastResponse.status) {
          console.log("Podcast updated!", podcastResponse.data);

          this.setState({
            podcastDetails: podcastResponse.data,
            subscribed: true,
          });
        }
      } catch (error) {
        console.log(error.response);
        alert("Something Failed. Check your network and try again.");
      }
    } else if (e.target.innerText === "Unsubscribe") {
      try {
        const subscribeResponse = await unsubscribeToAPodcast(
          podcastDetails._id
        );
        const podcastResponse = await getAPodcast(this.props.podcastId);

        if (subscribeResponse.status && podcastResponse.status) {
          console.log("Podcast updated!", podcastResponse.data);

          this.setState({
            podcastDetails: podcastResponse.data,
            subscribed: false,
          });
        }
      } catch (error) {
        console.log(error.response);
        alert("Something Failed. Check your network and try again.");
      }
    }
  };

  handlePodcastUpdate = (podcast) => {
    const newPodcastDetails = podcast;
    newPodcastDetails.author = this.state.podcastDetails.author;

    this.setState({
      podcastDetails: newPodcastDetails,
    });
  };

  redirectToLogin = () => {
    window.location = "/login";
  };

  render() {
    const { episodes, podcastDetails } = this.state;

    const episodeList = episodes.map((episode, i) => (
      <React.Fragment>
        <div className="episode-item" key={episode._id}>
          <div>
            <h3>
              <span style={{ opacity: "0.5" }}>{i + 1}</span> - {episode.title}
            </h3>
            <p>{episode.description}</p>
            <p>{episode.likesCount} likes </p>
          </div>
          <div className="button-container">
            {userDetails !== null && podcastDetails.userId === userDetails._id && (
              <React.Fragment>
                <button
                  onClick={(e) => this.handleEpisodeEditModal(e, episode)}
                >
                  {episodeEditIcon()} Edit
                </button>
                <button
                  onClick={(e) =>
                    this.handleEpisodeDeleteDialog(e, episode._id)
                  }
                >
                  {episodeDeleteIcon()} Delete
                </button>
              </React.Fragment>
            )}
            <button
              onClick={() => this.props.playerLaunch(episode, podcastDetails)}
            >
              {episodePlayIcon()} Play
            </button>
            {this.state.episodeDeleteDialog &&
              this.state.episodeId === episode._id && (
                <div className="delete-dialog">
                  {this.state.episodeDeleting ? (
                    "Deleting..."
                  ) : this.state.episodeDeleted ? (
                    "Deleted"
                  ) : (
                    <React.Fragment>
                      <span>
                        <i class="fas fa-info-circle"></i>
                      </span>
                      <p>Are you sure?</p>
                      <button
                        onClick={(e) =>
                          this.setState({ episodeDeleteDialog: false })
                        }
                      >
                        No
                      </button>
                      <button
                        onClick={(e) =>
                          this.handleEpisodeDelete(e, episode._id)
                        }
                      >
                        Delete
                      </button>
                    </React.Fragment>
                  )}
                </div>
              )}
          </div>

          <hr />
        </div>
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        {this.state.loading ? (
          <React.Fragment>
            <section id="podcast-page" className="podcast-page-container">
              <aside
                onClick={(e) => this.props.hidePodcastPage(e)}
                className="back-button"
              >
                {goBackIcon()}
              </aside>
              <aside className="podcast-page-wrapper">
                <div className="podcast-page-title-box">
                  <div className="podcast-page-title-text">
                    <h2>{podcastDetails.title}</h2>

                    <p>
                      {podcastDetails.author
                        ? "By: " +
                          podcastDetails.author.firstName +
                          " " +
                          podcastDetails.author.lastName
                        : "Author is not available"}
                    </p>
                    <p>
                      <span>Created:</span> {podcastDetails.date}
                    </p>
                    <p>
                      {podcastDetails.subscriptionsCount}{" "}
                      <span>subsciber(s)</span>
                    </p>
                  </div>

                  <div>
                    {this.state.deletePodcast ? (
                      <div id="confirm-dialog">
                        <p>Confirm?</p>
                        <button
                          className="yes"
                          onClick={this.handleDeletePodcast}
                        >
                          Yes
                        </button>
                        <button className="no" onClick={this.stopDeletePodcast}>
                          No
                        </button>
                      </div>
                    ) : this.state.deleteLoading ? (
                      <p className="deleting-message">Deleting podcast...</p>
                    ) : this.state.deleted ? (
                      <p className="deleting-message deleted">
                        Deleted. Redirecting you to your dashboard.
                      </p>
                    ) : (
                      <React.Fragment>
                        {userDetails !== null &&
                          podcastDetails.userId === userDetails._id && (
                            <React.Fragment>
                              <button
                                onClick={(e) =>
                                  this.handleShowUploadEditModal(
                                    e,
                                    this.state.podcastDetails
                                  )
                                }
                              >
                                {episodeEditIcon()} Update
                              </button>
                              <button onClick={this.deletePodcast}>
                                {" "}
                                {episodeDeleteIcon()}Delete
                              </button>
                            </React.Fragment>
                          )}
                        {userDetails === null && (
                          <React.Fragment>
                            <button onClick={(e) => this.redirectToLogin()}>
                              {subscribeIcon()} Subscribe
                            </button>
                          </React.Fragment>
                        )}
                        {userDetails !== null &&
                          podcastDetails.userId !== userDetails._id && (
                            <button
                              onClick={(e) =>
                                this.subscribeToPodcast(e, podcastDetails)
                              }
                            >
                              {this.state.subscribed
                                ? "Unsubscribe"
                                : "Subscribe"}
                            </button>
                          )}
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className="podcast-page-title-image">
                  <img src={podcastDetails.coverImageUrl} alt="" />
                </div>
              </aside>
              <aside className="podcast-page-title-content">
                <h6>
                  Description
                  <hr />
                </h6>

                <p>{podcastDetails.description}</p>
                {userDetails !== null &&
                  podcastDetails.userId === userDetails._id && (
                    <button
                      id="episode-upload-button"
                      onClick={() => this.handleEpisodeUploadModal()}
                    >
                      Upload Episode
                    </button>
                  )}
              </aside>
              <aside className="episode-section-container">
                <h2>
                  Episodes{" "}
                  {this.state.newBadge && (
                    <span className="new-badge ">NEW!</span>
                  )}
                </h2>

                {episodeList.length ? (
                  episodeList
                ) : (
                  <div className="empty-message">
                    <p>
                      You have no episodes on this podcast. Click on the{" "}
                      <NavLink to="/">upload button</NavLink> to add a podcast.
                    </p>
                  </div>
                )}

                <div></div>
              </aside>
            </section>
          </React.Fragment>
        ) : (
          <div id="icon-loading-container">
            <IconLoader />
          </div>
        )}
        {Object.keys(this.state.podcastDetails).length && (
          <UploadModal
            podcastDetails={this.state.podcastDetails}
            show={this.state.showUploadEditModal}
            uploadPodcast={this.state.uploadPodcast}
            closeModal={this.handleCloseModal}
            podcastEditIntention={true}
            updatePodcast={this.handlePodcastUpdate}
          />
        )}
        {this.state.episodeEditModal && (
          <EpisodeUploadModal
            show={this.state.episodeEditModal}
            uploadPodcast={this.state.showEpisodePodcast}
            closeModal={this.handleCloseModal}
            podcastDetails={this.state.podcastDetails}
            episodeEditIntention={true}
            episodeDetails={this.state.episodeDetails}
            updatePodcastDetails={this.updateEpisodeDetails}
            episodeId={this.state.episodeId}
          />
        )}

        {this.state.episodeUpload && (
          <EpisodeUploadModal
            show={this.state.episodeUpload}
            closeModal={this.handleCloseModal}
            podcastDetails={this.state.podcastDetails}
            updatePodcastDetails={this.updateEpisodeDetails}
            episodeUploadIntention={true}
            episodeId={this.state.episodeId}
          />
        )}
      </React.Fragment>
    );
  }
}

export { PodcastPage };

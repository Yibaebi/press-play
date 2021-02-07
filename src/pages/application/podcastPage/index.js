import React, { Component } from "react";
import "./podcastPage.css";
import {
  deletePodcast,
  getAllEpisodesOfAPodcast,
  getAPodcast,
} from "../../../api/auth";
import { NavLink } from "react-router-dom";
import { UploadModal } from "../../../widgets";
import { goBackIcon } from "../../../assets";
import { IconLoader } from "../../../utilities";

class PodcastPage extends Component {
  state = {
    podcastDetails: {},
    episodes: [],
    loading: null,
    showUploadEditModal: false,
    uploadPodcast: false,
    episodeEditModal: false,
    showEpisodePodcast: true,
    uploadPodcastDetails: {},
    deleteStaging: false,
    deletePodcast: false,
    deleteLoading: false,
    deleted: false,
  };

  handleEpisodeEditModal = () => {
    this.setState({
      episodeEditModal: true,
      showEpisodePodcast: false,
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
      const podcastResponse = await getAPodcast(this.props.podcastId);
      console.log("Podcast Details", podcastResponse.data);
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
    } catch (error) {}
  }

  render() {
    const { episodes, podcastDetails } = this.state;

    const episodeList = episodes.map((episode) => (
      <React.Fragment>
        <div className="episode-item" key={episode._id}>
          <div>
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
          </div>
          <div>
            <button onClick={this.handleEpisodeEditModal}>Edit</button>
            <button>Delete</button>
            <button>Play</button>
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
              <aside className="podcast-page-wrapper">
                <div className="podcast-page-title-box">
                  <aside
                    onClick={(e) => this.props.hidePodcastPage(e)}
                    className="back-button"
                  >
                    {goBackIcon()}
                  </aside>
                  <div className="podcast-page-title-text">
                    <h2>{podcastDetails.title}</h2>
                    <p>
                      {podcastDetails.author
                        ? "By " +
                          podcastDetails.author.firstName +
                          " " +
                          podcastDetails.author.lastName
                        : "Author is not available"}
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
                        <button
                          onClick={(e) =>
                            this.handleShowUploadEditModal(
                              e,
                              this.state.podcastDetails
                            )
                          }
                        >
                          Edit
                        </button>
                        <button onClick={this.deletePodcast}>Delete</button>
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className="podcast-page-title-image">
                  <img src={podcastDetails.coverImageUrl} alt="" />
                </div>
              </aside>
              <aside className="podcast-page-title-content">
                <p>
                  This is what the news should sound like. The biggest stories
                  of our time, told by the best journalists in the world. Hosted
                  by Michael Barbaro. Twenty minutes a day, five days a week,
                  ready by 6 a.m.
                </p>
              </aside>
              <aside className="episode-section-container">
                <h2>Episodes</h2>

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
          />
        )}
        <UploadModal
          show={this.state.episodeEditModal}
          uploadPodcast={this.state.showEpisodePodcast}
          closeModal={this.handleCloseModal}
        />
      </React.Fragment>
    );
  }
}

export { PodcastPage };

import React from "react";
import { getAllUserLikes } from "../../../api";
import { episodePlayIcon, noSubIcon } from "../../../assets";
import { IconLoader } from "../../../utilities";
import { PodcastPage } from "../podcastPage";
import "./favorites.css";

class FavoritesPage extends PodcastPage {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      emptyList: false,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    try {
      const likedEpisodeResponse = await getAllUserLikes();
      console.log("Liked episodes", likedEpisodeResponse.data.data);
      if (likedEpisodeResponse.data.data.length) {
        this.setState({
          loading: false,
          episodes: likedEpisodeResponse.data.data,
        });
      }

      if (likedEpisodeResponse.data.data.length === 0) {
        this.setState({
          emptyList: true,
        });
      }
    } catch (error) {}
  }

  render() {
    const { episodes } = { ...this.state };

    const episodesList = episodes.map((episode, i) => (
      <div className="episode-item" key={episode._id}>
        <div>
          <h3>
            <span style={{ opacity: "0.5" }}>{i + 1}</span> - {episode.title}
          </h3>
          <p>{episode.description}</p>
          <p>{episode.likesCount} likes </p>
        </div>
        <div className="button-container">
          <button
            onClick={() => this.props.playerLaunch(episode, episode.podcastId)}
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
                      onClick={(e) => this.handleEpisodeDelete(e, episode._id)}
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
    ));
    return (
      <React.Fragment>
        <div id="home" className="favorites-page">
          {this.state.emptyList ? (
            <React.Fragment>
              <div className="error-container">
                {noSubIcon()}
                <p>You dont have any favorites yet.</p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h4>Here are your liked episodes</h4>
              {this.state.loading ? (
                <div id="icon-loading-container">
                  <IconLoader />
                </div>
              ) : (
                episodesList
              )}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export { FavoritesPage };

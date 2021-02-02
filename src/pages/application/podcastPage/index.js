import React, { Component } from "react";
import "./podcastPage.css";
import recommendation1 from "../../../assets/images/recommendation pictures/Rectangle 285.png";
import { getAllEpisodesOfAPodcast, getAPodcast } from "../../../api/auth";
import { NavLink } from "react-router-dom";
import { UploadModal } from "../../../widgets";

class PodcastPage extends Component {
  state = {
    podcastDetails: {},
    episodes: [],
  };

  async componentDidMount() {
    try {
      const podcastResponse = await getAPodcast("6013389326c3d60f7c6294bd");
      console.log("Podcast Details", podcastResponse.data);

      const episodes = await getAllEpisodesOfAPodcast(
        "6013389326c3d60f7c6294bd"
      );
      console.log("Episodes", episodes.data);

      this.setState({
        podcastDetails: podcastResponse.data,
        episodes: episodes.data,
      });
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
            <button>Edit</button>
            <button>Delete</button>
            <button>Play</button>
          </div>
          <hr />
        </div>
      </React.Fragment>
    ));
    return (
      <React.Fragment>
        <section className="podcast-page-container">
          <aside className="podcast-page-wrapper">
            <div className="podcast-page-title-box">
              <div className="podcast-page-title-text">
                <h2>{podcastDetails.title}</h2>
                <p>{podcastDetails.userId}</p>
              </div>
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
            <div className="podcast-page-title-image">
              <img src={recommendation1} alt="" />
            </div>
          </aside>
          <aside className="podcast-page-title-content">
            <p>
              This is what the news should sound like. The biggest stories of
              our time, told by the best journalists in the world. Hosted by
              Michael Barbaro. Twenty minutes a day, five days a week, ready by
              6 a.m.
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
        <UploadModal />
      </React.Fragment>
    );
  }
}

export { PodcastPage };

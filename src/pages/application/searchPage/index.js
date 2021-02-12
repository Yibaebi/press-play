import React, { Component } from "react";
import { getAPodcast, searchService } from "../../../api";
import {
  goBackIcon,
  searchResultsIcon,
  subscribeIcon,
  unsubscribeIcon,
} from "../../../assets";
import { PodcastPage } from "../podcastPage";
import "./searchPage.css";
import "../podcastPage/podcastPage.css";

const userDetails = JSON.parse(localStorage.getItem("userDetails"));
console.log(userDetails);

class SearchPage extends PodcastPage {
  state = {
    emptyList: false,
    searchPodcastList: [],
    closeSearchResult: false,
  };

  async componentDidMount() {
    const search = await searchService(this.props.searchQuery);
    const searchResults = search.data;
    let searchPodcastList = [];

    for (let podcast of searchResults) {
      try {
        const listItem = await getAPodcast(podcast._id);
        console.log("Current podcast", listItem);
        searchPodcastList.push(listItem.data);
      } catch (error) {
        continue;
      }
    }

    console.log("Podcast List", searchPodcastList);

    if (searchPodcastList.length) {
      this.setState({ emptyList: false, searchPodcastList });
    }

    if (searchPodcastList.length === 0) {
      this.setState({
        emptyList: true,
      });
    }
  }

  hidePodcastPage = () => {
    this.setState({
      showPodcastPage: false,
    });
  };

  handleShowPodcastPage = (e, podcastId) => {
    this.setState({
      showPodcastPage: true,
      podcastId,
    });
  };

  render() {
    const { searchPodcastList } = { ...this.state };
    const podcastList = searchPodcastList.map((podcast, i) => (
      <section
        key={podcast._id}
        id="podcast-page"
        className="podcast-page-container"
      >
        <aside className="podcast-page-wrapper">
          <div className="podcast-page-title-box">
            <div className="podcast-page-title-text">
              <h4>{podcast.title}</h4>
              <p>
                {podcast.author
                  ? "By: " +
                    podcast.author.firstName +
                    " " +
                    podcast.author.lastName
                  : "Author is not available"}
              </p>
              <p>
                <span>Created:</span> {podcast.date}
              </p>
              <p>
                {podcast.subscriptionsCount} <span>subsciber(s)</span>
              </p>
            </div>

            <div className="search-results-button">
              {userDetails === null && (
                <React.Fragment>
                  <button onClick={(e) => this.redirectToLogin()}>
                    {subscribeIcon()} Subscribe
                  </button>
                </React.Fragment>
              )}
              {userDetails !== null && podcast.userId !== userDetails._id && (
                <React.Fragment>
                  <button
                    onClick={(e) => this.subscribeToPodcast(e, podcast._id)}
                    className="subscribe-button"
                  >
                    {this.state.subscribed ? (
                      <div
                        onClick={(e) =>
                          this.subscribeToPodcast(e, podcast, "unsubscribe")
                        }
                      >
                        {unsubscribeIcon()} Unsubscribe
                      </div>
                    ) : (
                      <div
                        onClick={(e) =>
                          this.subscribeToPodcast(e, podcast, "subscribe")
                        }
                      >
                        {subscribeIcon()} Subscribe
                      </div>
                    )}
                  </button>
                  <button
                    onClick={(e) => this.handleShowPodcastPage(e, podcast._id)}
                  >
                    View episodes
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="podcast-page-title-image">
            <img src={podcast.coverImageUrl} alt="" />
          </div>
        </aside>
        <aside className="podcast-page-title-content">
          <p>{podcast.description}</p>
          <hr />
        </aside>
      </section>
    ));

    return (
      <div id="search-page">
        {this.state.emptyList ? (
          <React.Fragment>
            {searchResultsIcon()} <p>No search results</p>{" "}
          </React.Fragment>
        ) : this.state.showPodcastPage ? (
          <PodcastPage
            playerLaunch={this.props.playerLaunch}
            podcastId={this.state.podcastId}
            hidePodcastPage={this.hidePodcastPage}
          />
        ) : (
          <div className="search-results">
            {podcastList.length && (
              <React.Fragment>
                {" "}
                <h3>Search results ({podcastList.length})</h3>
                {podcastList}
              </React.Fragment>
            )}
          </div>
        )}
      </div>
    );
  }
}

export { SearchPage };

import React from "react";
import { getAPodcast } from "../../api";
import { unsubscribeIcon } from "../../assets";

class ImageSlide extends React.Component {
  state = {
    author: {},
  };
  async componentDidMount() {
    try {
      const getCurrentPodcast = await getAPodcast(this.props.podcastId);
      console.log(getCurrentPodcast.data);

      this.setState({
        author: getCurrentPodcast.data.author,
      });
    } catch (error) {}
  }

  render() {
    const { author } = { ...this.state };
    return (
      <div id="carousel" className="slide-item">
        <img
          className="image-slide"
          src={this.props.url}
          alt=""
          onClick={(e) => this.props.getPodcastId(e, this.props.podcastId)}
        />

        <div
          className="slide-item-desc"
          onClick={(e) => this.props.getPodcastId(e, this.props.podcastId)}
        >
          <h3>{this.props.title}</h3>
          <p>{author.firstName + " " + author.lastName}</p>
        </div>

        {this.props.subscribed && (
          <button
            onClick={(e) => this.props.unsubscribe(e, this.props.podcastId)}
          >
            {unsubscribeIcon()} Unsubscribe
          </button>
        )}
      </div>
    );
  }
}

export { ImageSlide };

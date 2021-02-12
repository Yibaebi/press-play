import React from "react";
import { getAllUserLikes, likeAnEpisode, unlikeAnEpisode } from "../../../api";
import {
  likedIcon,
  likeIcon,
  pauseIcon,
  playIcon,
  seekBackwardsIcon,
  seekForwardsIcon,
  volumeFullIcon,
  volumeLowIcon,
  volumeMuteIcon,
} from "../../../assets";
import "./controls.css";

class AudioControls extends React.Component {
  state = {
    show: true,
    liked: false,
    showAlert: false,
    showUnlikedAlert: false,
    volumeValue: 20,
  };

  async componentDidMount() {
    try {
      const getCurrentLikes = await getAllUserLikes();
      for (let episode of getCurrentLikes.data.data) {
        console.log(episode);
        if (episode._id === this.props.episodeId) {
          console.log("liked");
          this.setState({
            liked: true,
          });
        }
      }
    } catch (error) {}
    this.setState({
      playing: this.props.playing,
    });
  }

  handleEpisodeLike = async () => {
    const liked = this.state.liked ? false : true;
    const showAlert = liked ? true : false;

    if (liked) {
      try {
        const likeResponse = await likeAnEpisode(this.props.episodeId);
        console.log(likeResponse.data);

        if (likeResponse.status) {
          this.setState({
            liked,
            showAlert,
          });
          setTimeout(() => {
            this.setState({
              showAlert: false,
            });
          }, 3000);
        }
      } catch (error) {}
    } else {
      try {
        const unlikeResponse = await unlikeAnEpisode(this.props.episodeId);
        console.log(unlikeResponse.data);

        if (unlikeResponse.status) {
          this.setState({
            liked,
            showUnlikeAlert: true,
          });
          setTimeout(() => {
            this.setState({
              showUnlikeAlert: false,
            });
          }, 3000);
        }
      } catch (error) {}
    }
  };

  handleVolumeChange = (e) => {
    this.setState({
      volumeValue: e.currentTarget.value,
    });
    this.props.volumeChange(e.currentTarget.value);
  };

  handleVolumeMute = () => {
    const currentVolume = Boolean(this.state.volumeValue) ? 0 : 20;
    this.setState({
      volumeValue: currentVolume,
    });
    this.props.volumeChange(currentVolume);
  };

  // handleEpisodePlay = () => {
  //   this.props.handleEpisodePlay();
  // };

  handleAudioSeek = (e, action) => {
    this.props.audioSeek(e, action);
  };

  fmtMSS = (seconds) => {
    return (
      (seconds - (seconds %= 60)) / 60 + (9 < seconds ? ":" : ":0") + ~~seconds
    );
  };

  render() {
    return (
      <section id="audio-controls-section">
        {this.state.showAlert ? (
          <div className="favorites-alert">Added to Favourites</div>
        ) : this.state.showUnlikedAlert ? (
          <div className="favorites-alert remove">Removed from Favourites</div>
        ) : (
          ""
        )}
        <aside className="play-controls-icons section">
          <div className="item like-container" onClick={this.handleEpisodeLike}>
            {this.state.liked ? likedIcon() : likeIcon()}
          </div>
          <div
            className="item"
            onClick={(e) => this.handleAudioSeek(e, "backward")}
          >
            {seekBackwardsIcon()}
          </div>
          <div className="item" onClick={() => this.props.handleEpisodePlay()}>
            {this.props.playing ? pauseIcon() : playIcon()}
          </div>
          <div
            className="item"
            onClick={(e) => this.handleAudioSeek(e, "forward")}
          >
            {seekForwardsIcon()}
          </div>
        </aside>
        <aside className="audio-progress-container section">
          <div className="audio-slider">
            <input
              type="range"
              name="audioProgressBar"
              id="audioProgressBar"
              value={
                this.props.duration
                  ? (this.props.currentTime * 100) / this.props.duration
                  : 0
              }
              max={100}
              onChange={(e) => this.props.handleEpisodeProgress(e)}
            />
          </div>
          <div className="time-info">
            <p>{this.fmtMSS(this.props.currentTime)}</p>
            <p>{this.fmtMSS(this.props.duration)}</p>
          </div>
        </aside>
        <aside className="volume-controls section">
          <div className="volume-icon" onClick={this.handleVolumeMute}>
            {this.state.volumeValue <= 0
              ? volumeMuteIcon()
              : this.state.volumeValue > 0 && this.state.volumeValue < 61
              ? volumeLowIcon()
              : volumeFullIcon()}
          </div>
          <div className="audio-slider">
            <input
              type="range"
              name="audioProgressBar"
              id="audioProgressBar"
              max={100}
              value={Math.round(this.state.volumeValue)}
              onChange={(e) => this.handleVolumeChange(e)}
            />
          </div>
        </aside>
      </section>
    );
  }
}

export { AudioControls };

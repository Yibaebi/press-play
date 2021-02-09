import React, { Component } from "react";
import { AudioHeader } from "./header/index";
import { AudioControls } from "./controls/index";
import "./audioplayer.css";

export class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodeCurrentTime: 0,
      duration: 0,

      episodeDetails: this.props.episodeDetails,
      podcastDetails: null,

      playing: true,
    };
    this.audioRef = React.createRef();
  }

  async componentDidMount() {
    this.audioRef.current.play();
  }

  handleEpisodePlay = (playing) => {
    if (playing) {
      this.audioRef.current.play();
    } else {
      this.audioRef.current.pause();
    }
  };

  handleVolumeChange = (volume) => {
    this.audioRef.current.volume = volume / 100;
  };

  handleEpisodeProgress = (e) => {
    const episodeCurrentTime = (e.target.value * this.state.duration) / 100;
    this.setState({
      episodeCurrentTime,
    });

    if (this.state.duration === episodeCurrentTime) {
      this.setState({
        playing: false,
      });
    }

    this.audioRef.current.currentTime = episodeCurrentTime;
  };

  handleAudioSeek = (e, action) => {
    if (action === "forward") {
      const currentTime = this.state.episodeCurrentTime + 10;
      this.setState({
        episodeCurrentTime: currentTime,
      });
      this.audioRef.current.currentTime = currentTime;
    }
    if (action === "backward") {
      if (this.state.episodeCurrentTime > 0) {
        const currentTime = this.state.episodeCurrentTime - 10;
        this.setState({
          episodeCurrentTime: currentTime,
        });
        this.audioRef.current.currentTime = currentTime;
      }
    }
  };

  render() {
    const { episodeDetails, podcastDetails } = { ...this.props };
    return (
      this.props.launchPlayer && (
        <main id="audio-player-container">
          <audio
            onTimeUpdate={(e) =>
              this.setState({ episodeCurrentTime: e.target.currentTime })
            }
            onCanPlay={(e) => this.setState({ duration: e.target.duration })}
            autoPlay={true}
            ref={this.audioRef}
            preload="auto"
            typeof="audio/mpeg"
            src={episodeDetails.episodeAudioUrl}
          />
          <AudioHeader
            episodeTitle={episodeDetails.title}
            podcastAuthor={
              podcastDetails.author
                ? podcastDetails.author.firstName +
                  " " +
                  podcastDetails.author.lastName
                : "N/A"
            }
            podcastCover={podcastDetails && podcastDetails.coverImageUrl}
          />
          <AudioControls
            currentTime={this.state.episodeCurrentTime}
            volumeChange={this.handleVolumeChange}
            handleEpisodePlay={this.handleEpisodePlay}
            handleEpisodeProgress={this.handleEpisodeProgress}
            duration={this.state.duration}
            audioSeek={this.handleAudioSeek}
            playing={this.state.playing}
          />
        </main>
      )
    );
  }
}

export default AudioPlayer;

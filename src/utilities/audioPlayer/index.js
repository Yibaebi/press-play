import React, { Component } from "react";
import { AudioHeader } from "./header/index";
import { AudioControls } from "./controls/index";
import "./audioplayer.css";
import { getAnEpisode, getAPodcast } from "../../api";

export class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodeCurrentTime: 0,
      duration: 0,

      episodeDetails: {},
      podcastDetails: null,

      playing: false,
    };
    this.audioRef = React.createRef();
  }

  async componentDidMount() {
    try {
      const podcastDetails = await getAPodcast("601bf9ab627d8c00043aa0da");
      console.log(podcastDetails);
      const episodeDetails = await getAnEpisode("601d12e0c62714000436529f");
      console.log(episodeDetails);

      if (podcastDetails.data && episodeDetails.data) {
        this.setState({
          podcastDetails: podcastDetails.data,
          episodeDetails: episodeDetails.data,
        });
      }
    } catch (error) {}
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
      const currentTime = this.state.episodeCurrentTime - 10;
      this.setState({
        episodeCurrentTime: currentTime,
      });
      this.audioRef.current.currentTime = currentTime;
    }
  };

  render() {
    const { episodeDetails, podcastDetails } = { ...this.state };
    console.log(podcastDetails);
    return (
      <main id="audio-player-container">
        <audio
          onTimeUpdate={(e) =>
            this.setState({ episodeCurrentTime: e.target.currentTime })
          }
          onCanPlay={(e) => this.setState({ duration: e.target.duration })}
          ref={this.audioRef}
          preload="auto"
          typeof="audio/mpeg"
          src={episodeDetails.episodeAudioUrl}
        />
        <AudioHeader
          episodeTitle={episodeDetails.title}
          podcastAuthor={
            podcastDetails
              ? podcastDetails.author.firstName +
                " " +
                podcastDetails.author.lastName
              : "Loading..."
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
    );
  }
}

export default AudioPlayer;

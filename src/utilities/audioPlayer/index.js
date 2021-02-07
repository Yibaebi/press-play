import React, { Component } from "react";
import { AudioHeader } from "./header/index";
import { AudioControls } from "./controls/index";
import flydown from "../../assets/Fly Down.mp3";
import "./audioplayer.css";

export class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodeCurrentTime: 0,
      duration: 0,
    };
    this.audioRef = React.createRef();
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
          src={flydown}
        />
        <AudioHeader />
        <AudioControls
          currentTime={this.state.episodeCurrentTime}
          volumeChange={this.handleVolumeChange}
          handleEpisodePlay={this.handleEpisodePlay}
          handleEpisodeProgress={this.handleEpisodeProgress}
          duration={this.state.duration}
          audioSeek={this.handleAudioSeek}
        />
      </main>
    );
  }
}

export default AudioPlayer;

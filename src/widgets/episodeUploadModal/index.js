import React from "react";
import { captureEpisodeDetails, uploadEpisode } from "../../api/auth";
import { headphoneIcon } from "../../assets";
import { UploadModal } from "../uploadModal";
import { Tab } from "react-bootstrap";
import { Modal, Tabs } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import flydown from "../../assets/Fly Down.mp3";

class EpisodeUploadModal extends UploadModal {
  constructor(props) {
    super(props);
    this.state = {
      podcastDetails: {},
      userId: "",
      // Modal state
      disabled: true,
      backLabel: "Close",
      show: true,
      progressBar: 50,

      // Episode state
      episodeDescription: {
        episodeTitle: "",
        episodeDescription: "",
      },
      audioName: "choose audio",
      audioFile: null,

      //IconLoader
      IconLoader: "",
    };
  }

  async componentDidMount() {
    const user = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(user);
    console.log("current user ", userDetails);

    this.setState({
      userId: userDetails._id,
    });

    try {
      const podcastDescription = this.state.podcastDescription;
      podcastDescription.podcastTitle =
        (await this.props.podcastDetails.title) || "";
      podcastDescription.podcastDescription =
        this.props.podcastDetails.description || "";

      this.setState({
        podcastDetails: this.props.podcastDetails || {},
        podcastDescription: podcastDescription,
        coverImage: await this.props.podcastDetails.coverImageUrl,
      });
    } catch (error) {}
  }

  handleDialogReturn = () => {
    const { progressBar, coverName, backLabel } = this.state;
    if (progressBar === 100)
      this.setState({
        progressBar: 50,
      });

    if (progressBar === 50 && backLabel === "Close") {
      console.log("Close Clicked");
    }

    if (coverName) {
      this.setState({
        disabled: false,
      });
    }
  };

  handleUploadSubmit = async () => {
    this.setState({ disabled: true });
    const progressBar = this.state.progressBar;
    if (progressBar === 50)
      this.setState({
        progressBar: 100,
      });

    this.setState({
      disabled: false,
    });

    if (this.state.progressBar === 100) {
      alert("Yes!");

      this.setState({
        disabled: false,
      });

      //If a user does not want to edit his podcast
      //   if (!this.props.podcastEditIntention) {
      //     this.props.createSuccess(true, false);
      //   }

      const episodeDetails = captureEpisodeDetails(
        flydown,
        this.state.episodeDescription.episodeTitle,
        this.state.episodeDescription.episodeDescription,
        "6013389326c3d60f7c6294bd"
      );

      console.log("The received ", episodeDetails);

      try {
        const response = await uploadEpisode(episodeDetails);
        console.log("Response", response);

        if (response.status) {
        }
      } catch (error) {
        console.log("Error", error);
        alert("Failed");
        // window.location = "/dashboard/dashboard";
      }
    }
  };

  validatePodcastOrEpisodeDescription = () => {
    const episodeDescription = { ...this.state.episodeDescription };
    if (
      episodeDescription.episodeTitle &&
      episodeDescription.episodeDescription
    ) {
      return true;
    } else {
      return false;
    }
  };

  handleAudioUpload = (e, input) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ audioFile: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    if (input === "audio") {
      this.setState({
        audioName: e.target.files[0].name.substring(0, 15) + "...",
        disabled: false,
      });
    }
  };

  audioContent = () => {
    return (
      <section className="cover-content">
        <div className="upload-input-container">
          <div className="content-wrapper">
            <p>Drag and drop image file here</p>
            <p>or</p>
            <input
              type="file"
              onChange={(e) => this.handleAudioUpload(e, "audio")}
              name="audioFile"
              id="audioFile"
              hidden
              accept=".mp4, .wav, .m4a, .mp3"
            />
            <label for="audioFile">
              {headphoneIcon()}
              {this.state.audioName}
            </label>
          </div>
        </div>
        {this.state.audioFile ? (
          <div id="audioTarget">
            <p>Audio preview</p>
            <audio src={this.state.audioFile} controls></audio>
          </div>
        ) : (
          " "
        )}
      </section>
    );
  };

  descriptionContent = () => {
    return (
      <section className="cover-content">
        <div className="description-input-wrapper">
          <React.Fragment>
            <label for="episodeTitle" className="description-content-container">
              <p>Episode Name</p>
              <input
                value={this.state.episodeDescription.episodeTitle}
                onChange={this.handleInputChange}
                type="text"
                name="episodeTitle"
                placeholder="Title of episode goes here"
                id="episodeTitle"
              />
            </label>
            <label
              for="episodeTitle"
              className="description-content-container desc"
            >
              <p>Episode Description</p>

              <textarea
                value={this.state.episodeDescription.episodeDescription}
                onChange={this.handleInputChange}
                name="episodeDescription"
                id="episodeDescription"
                cols="30"
                rows="10"
                placeholder="Add an episode description"
                required
              ></textarea>
            </label>
          </React.Fragment>
        </div>
      </section>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={true}>
          <ProgressBar now={this.state.progressBar} />
          <Modal.Header>
            {this.props.uploadPodcast ? (
              <Modal.Title>
                {this.state.progressBar === 50
                  ? "Step 1 of 2: Choose your cover art"
                  : "Step 2 of 2: Add information for this podcast"}
              </Modal.Title>
            ) : (
              <Modal.Title>
                {this.state.progressBar === 50
                  ? "Step 1 of 2: Add information for this episode"
                  : "Step 2 of 2: Upload episode audio"}
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            {this.props.uploadPodcast ? (
              <Tabs>
                {this.state.progressBar === 50 ? (
                  <Tab eventKey="home">{this.coverContent()}</Tab>
                ) : (
                  <Tab className="active" eventKey="profile">
                    {this.descriptionContent()}
                  </Tab>
                )}
              </Tabs>
            ) : (
              <Tabs>
                {this.state.progressBar === 50 ? (
                  <Tab eventKey="home">{this.descriptionContent()}</Tab>
                ) : (
                  <Tab className="active" eventKey="profile">
                    {this.audioContent()}
                  </Tab>
                )}
              </Tabs>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDialogReturn}>
              {this.state.progressBar === 50 ? this.state.backLabel : "Back"}
            </Button>
            <Button
              disabled={this.state.disabled}
              onClick={this.handleUploadSubmit}
              variant="primary"
            >
              {this.state.progressBar === 100 ? "Complete" : "Next"}
            </Button>
          </Modal.Footer>
        </Modal>
        {this.state.IconLoader}
      </React.Fragment>
    );
  }
}

export { EpisodeUploadModal };

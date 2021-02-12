import React from "react";
import {
  captureEpisodeDetails,
  captureEpisodeUpdateDetails,
  getAllEpisodesOfAPodcast,
  updateEpisode,
  uploadEpisode,
} from "../../api/auth";
import { headphoneIcon } from "../../assets";
import { UploadModal } from "../uploadModal";
import { Tab } from "react-bootstrap";
import { Modal, Tabs } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { IconLoaderVariant1 } from "../../utilities";

class EpisodeUploadModal extends UploadModal {
  constructor(props) {
    super(props);
    this.state = {
      podcastDetails: {},
      userId: "",
      // Modal state
      disabled: false,
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
      audioFilePreview: null,

      //IconLoader
      IconLoader: "",

      // Upload progress
      uploadInProgress: false,
      uploadCompleted: false,
    };
  }

  async componentDidMount() {
    const user = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(user);

    this.setState({
      userId: userDetails._id,
    });

    try {
      if (this.props.episodeEditIntention) {
        console.log(this.props.episodeDetails);
        const episodeDescription = this.state.episodeDescription;
        episodeDescription.episodeTitle = this.props.episodeDetails.title || "";
        episodeDescription.episodeDescription =
          this.props.episodeDetails.description || "";

        this.setState({
          episodeDetails: this.props.episodeDetails || {},
          episodeDescription: episodeDescription,
        });
      }
    } catch (error) {}
  }

  handleDialogReturn = () => {
    const { progressBar, coverName, backLabel } = this.state;
    if (progressBar === 100)
      this.setState({
        progressBar: 50,
      });

    if (progressBar === 50 && backLabel === "Close") {
      this.props.closeModal();
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
      this.setState({
        disabled: false,
        uploadInProgress: true,
      });

      //If a user does not want to edit his podcast
      //   if (!this.props.podcastEditIntention) {
      //     this.props.createSuccess(true, false);
      //   }

      const episodeDetails = this.props.episodeEditIntention
        ? captureEpisodeUpdateDetails(
            this.state.audioFile,
            this.state.episodeDescription.episodeTitle,
            this.state.episodeDescription.episodeDescription
          )
        : captureEpisodeDetails(
            this.state.audioFile,
            this.state.episodeDescription.episodeTitle,
            this.state.episodeDescription.episodeDescription,
            this.props.podcastDetails._id
          );
      try {
        console.log(this.props.episodeId);

        const response = this.props.episodeEditIntention
          ? await updateEpisode(episodeDetails, this.props.episodeId)
          : await uploadEpisode(episodeDetails);

        if (response.status) {
          const newEpisodes = await getAllEpisodesOfAPodcast(
            this.props.podcastDetails._id
          );
          console.log("New podcast details", newEpisodes);

          if (newEpisodes.status) {
            this.props.updatePodcastDetails(newEpisodes.data);
            this.props.closeModal();
          }
        }
      } catch (error) {
        this.setState({
          uploadCompleted: true,
          uploadInProgress: false,
        });
        console.log("Error", error.response.data);
        alert("Failed");
        setTimeout(() => {
          this.props.closeModal();
        }, 2000);
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
      this.setState({ audioFile: e.target.files[0] });
    }
    if (input === "audio") {
      this.setState({
        audioName: e.target.files[0].name.substring(0, 15) + "...",
        disabled: false,
      });
    }

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ audioFilePreview: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
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
            <audio src={this.state.audioFilePreview} controls></audio>
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
        <Modal show={this.props.show}>
          {this.state.uploadInProgress ? (
            this.state.uploadCompleted ? (
              <React.Fragment>
                <div className="upload-in-progress completed">
                  Completed. Please wait..
                  <i className="fa fa-check-square" aria-hidden="true"></i>
                </div>
              </React.Fragment>
            ) : (
              <div className="upload-in-progress">
                <IconLoaderVariant1 />
                {this.props.episodeEditIntention
                  ? "Editing in progress"
                  : "Episode upload in progress..."}
              </div>
            )
          ) : (
            <React.Fragment>
              <Modal.Header>
                <Modal.Title>
                  {this.state.progressBar === 50
                    ? "Step 1 of 2: Add information for this episode"
                    : "Step 2 of 2: Upload episode audio"}
                </Modal.Title>
              </Modal.Header>
              <ProgressBar now={this.state.progressBar} />
              <Modal.Body>
                <Tabs>
                  {this.state.progressBar === 50 ? (
                    <Tab eventKey="home">{this.descriptionContent()}</Tab>
                  ) : (
                    <Tab className="active" eventKey="profile">
                      {this.audioContent()}
                    </Tab>
                  )}
                </Tabs>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleDialogReturn}>
                  {this.state.progressBar === 50
                    ? this.state.backLabel
                    : "Back"}
                </Button>
                <Button
                  disabled={this.state.disabled}
                  onClick={this.handleUploadSubmit}
                  variant="primary"
                >
                  {this.state.progressBar === 100 ? "Complete" : "Next"}
                </Button>
              </Modal.Footer>
            </React.Fragment>
          )}
        </Modal>
        {this.state.IconLoader}
      </React.Fragment>
    );
  }
}

export { EpisodeUploadModal };

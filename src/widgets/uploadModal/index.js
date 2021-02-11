import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal, Tabs, Tab } from "react-bootstrap";
import ModalButton from "react-bootstrap/Button";
import "./uploadModal.css";
import { inputFileIcon, headphoneIcon } from "../../assets";
import { AuthenticationPage } from "../../pages/auth/authPages";
import { capturePodcastDetails, updatePodcast } from "../../api/auth";
import { IconLoaderVariant1 } from "../../utilities/loader";

class UploadModal extends AuthenticationPage {
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

      // Podcast state
      podcastDescription: {
        podcastTitle: "",
        podcastDescription: "",
      },
      coverImage: "",
      coverFile: "",
      coverName: "choose cover",

      //IconLoader
      IconLoader: "",

      // Editing
      editInProgress: false,
      updateCompleted: false,
    };
  }

  async componentDidMount() {
    const user = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(user);
    console.log("current user ", userDetails);

    if (userDetails) {
      this.setState({
        userId: userDetails._id,
      });
    }

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
      alert("Yes!");

      this.setState({
        disabled: false,
      });

      this.setState({
        editInProgress: true,
      });

      //If a user does not want to edit his podcast
      if (!this.props.podcastEditIntention) {
        this.props.createSuccess(true, false);
      }

      const podcastOrEpisodeDetails = capturePodcastDetails(
        this.props.podcastDetails.coverImageUrl,
        this.state.podcastDescription.podcastTitle,
        this.state.podcastDescription.podcastDescription,
        this.state.userId
      );

      try {
        console.log("Still in uploadMoadl");
        const response = await updatePodcast(
          podcastOrEpisodeDetails,
          this.state.podcastDetails._id
        );

        const newPodcastDetails = response.data.data;

        if (response.status) {
          if (!this.props.podcastEditIntention) {
            this.props.createSuccess(true, true);
          }

          this.props.updatePodcast(newPodcastDetails);

          this.setState({
            editInProgress: true,
            updateCompleted: true,
          });

          setTimeout(() => {
            this.props.closeModal();
          }, 2000);
        }
      } catch (error) {
        console.log("Error", error);
        alert("Failed");
        // window.location = "/dashboard/dashboard";
      }
    }
  };

  validatePodcastOrEpisodeDescription = () => {
    if (this.props.uploadPodcast) {
      const podcastDescription = { ...this.state.podcastDescription };
      if (
        podcastDescription.podcastTitle &&
        podcastDescription.podcastDescription
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      const episodeDescription = { ...this.state.episodeDescription };
      if (
        episodeDescription.episodeTitle &&
        episodeDescription.episodeDescription
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  handleInputChange = ({ currentTarget: input }) => {
    if (this.props.uploadPodcast) {
      const podcastDescription = { ...this.state.podcastDescription };
      podcastDescription[input.name] = input.value;
      console.log(podcastDescription);
      this.setState({ podcastDescription });

      const validation = this.validatePodcastOrEpisodeDescription();
      if (validation) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: false,
        });
      }
    } else {
      const episodeDescription = { ...this.state.episodeDescription };
      episodeDescription[input.name] = input.value;
      console.log(episodeDescription);
      this.setState({ episodeDescription });

      const episodevalidation = this.validatePodcastOrEpisodeDescription();
      if (episodevalidation) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: false,
        });
      }
    }
  };

  handleImageChange = (e, input) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ coverImage: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    if (input === "cover") {
      this.setState({
        coverName: e.target.files[0].name.substring(0, 15) + "...",
        disabled: false,
      });
    }

    console.log(e.target.files[0]);
    this.setState({
      coverFile: e.target.files[0],
    });
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

  coverContent = () => {
    return (
      <section className="cover-content" id="cover-content">
        <div className="upload-input-container">
          <div className="content-wrapper">
            <React.Fragment>
              <p>Drag and drop image file here</p>
              <p>or</p>
              <input
                type="file"
                name="coverImage"
                id="coverImage"
                hidden
                onChange={(e) => this.handleImageChange(e, "cover")}
                accept=".jpg, .jpeg, .png"
              />
              <label for="coverImage">
                {inputFileIcon()}
                {this.state.coverName}
              </label>
            </React.Fragment>
          </div>
        </div>

        {this.state.coverImage ? (
          <div id="target">
            <p>Cover preview</p>
            <img id="target" src={this.state.coverImage} alt="" />
          </div>
        ) : (
          " "
        )}
      </section>
    );
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
            <label for="podcastTitle" className="description-content-container">
              <p>Podcast Name</p>
              <input
                value={this.state.podcastDescription.podcastTitle}
                onChange={this.handleInputChange}
                type="text"
                name="podcastTitle"
                placeholder="Title of podcast goes here"
                id="podcastTitle"
              />
            </label>
            <label
              for="podcastTitle"
              className="description-content-container desc"
            >
              <p>Podcast Description</p>

              <textarea
                value={this.state.podcastDescription.podcastDescription}
                onChange={this.handleInputChange}
                name="podcastDescription"
                id="podcastDescription"
                cols="30"
                rows="10"
                placeholder="Tell everyone about your podcast"
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
          {this.state.editInProgress ? (
            <React.Fragment>
              {this.state.updateCompleted ? (
                <React.Fragment>
                  <div className="upload-in-progress completed">
                    Completed. Please wait..
                    <i className="fa fa-check-square" aria-hidden="true"></i>
                  </div>
                </React.Fragment>
              ) : (
                <div className="upload-in-progress">
                  <IconLoaderVariant1 />
                  Updating podcast please wait...
                </div>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ProgressBar now={this.state.progressBar} />
              <Modal.Header>
                <Modal.Title>
                  {this.state.progressBar === 50
                    ? "Step 1 of 2: Choose your cover art"
                    : "Step 2 of 2: Add information for this podcast"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Tabs>
                  {this.state.progressBar === 50 ? (
                    <Tab eventKey="home">{this.coverContent()}</Tab>
                  ) : (
                    <Tab className="active" eventKey="profile">
                      {this.descriptionContent()}
                    </Tab>
                  )}
                </Tabs>
              </Modal.Body>
              <Modal.Footer>
                <ModalButton
                  variant="secondary"
                  onClick={this.handleDialogReturn}
                >
                  {this.state.progressBar === 50
                    ? this.state.backLabel
                    : "Back"}
                </ModalButton>
                <ModalButton
                  disabled={this.state.disabled}
                  onClick={this.handleUploadSubmit}
                  variant="primary"
                >
                  {this.state.progressBar === 100 ? "Complete" : "Next"}
                </ModalButton>
              </Modal.Footer>
            </React.Fragment>
          )}
        </Modal>
        {this.state.IconLoader}
      </React.Fragment>
    );
  }
}

export { UploadModal };

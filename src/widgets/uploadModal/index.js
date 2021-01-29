import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal, Tabs, Tab } from "react-bootstrap";
import ModalButton from "react-bootstrap/Button";
import "./uploadModal.css";
import { Button } from "../../components";
import { inputFileIcon, headphoneIcon } from "../../assets";
import { AuthenticationPage } from "../../pages/auth/authPages";
import { capturePodcastDetails, uploadPodcastDetails } from "../../api/auth";

class UploadModal extends AuthenticationPage {
  constructor(props) {
    super(props);
    this.state = {
      uploadTitles: {
        cover: "Choose your cover image",
      },
      disabled: true,
      disabledUpload: true,
      backLabel: "Close",
      show: true,
      progressBar: 33,
      coverName: "choose cover",
      audioName: "choose audio",
      podcastDescription: {
        podcastTitle: "",
        podcastDescription: "",
      },

      coverImage: "",
      coverFile: "",
    };
  }

  handleDialogReturn = () => {
    const {
      progressBar,
      podcastDescription,
      coverName,
      backLabel,
    } = this.state;
    if (progressBar === 100)
      this.setState({
        progressBar: 66,
      });
    if (progressBar === 66)
      this.setState({
        progressBar: 33,
      });
    if (progressBar === 33 && backLabel === "Close") {
      this.handleModalClose();
      this.props.closeModal();
    }
    if (coverName) {
      this.setState({
        disabled: false,
      });
    }
    if (podcastDescription.podcastTitle && podcastDescription.podcastTitle) {
      this.setState({
        disabled: false,
      });
    }
  };

  handleModalClose = () => {
    this.setState({
      show: false,
    });
  };

  handleFileUpload = (e, input) => {};

  handleUploadSubmit = async () => {
    this.setState({ disabled: true });
    const progressBar = this.state.progressBar;
    if (progressBar === 33)
      this.setState({
        progressBar: 66,
      });
    if (progressBar === 66) {
      this.setState({
        progressBar: 100,
      });
      this.setState({
        disabled: false,
      });
    }
    if (this.state.podcastTitle && this.state.podcastTitle) {
      this.setState({
        disabled: false,
      });
    }
    if (this.state.progressBar === 100) {
      alert("Yes!");
      this.setState({
        disabled: false,
      });

      const podcastDetails = capturePodcastDetails(
        this.state.coverFile,
        this.state.podcastDescription.podcastTitle,
        this.state.podcastDescription.podcastDescription,
        "600e07f179177500043836ec"
      );

      console.log("The received ", podcastDetails);

      try {
        const response = await uploadPodcastDetails(podcastDetails);
        console.log("Response", response);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  validatePodcastDescription = () => {
    const podcastDescription = { ...this.state.podcastDescription };
    if (
      podcastDescription.podcastTitle &&
      podcastDescription.podcastDescription
    ) {
      return true;
    } else {
      return false;
    }
  };

  handleInputChange = ({ currentTarget: input }) => {
    const podcastDescription = { ...this.state.podcastDescription };
    podcastDescription[input.name] = input.value;
    console.log(podcastDescription);
    this.setState({ podcastDescription });

    const validation = this.validatePodcastDescription();
    if (validation) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  };

  onImageChange = (e, input) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ coverImage: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    if (input === "cover") {
      this.setState({
        coverName: e.target.files[0].name,
        disabled: false,
        disabledUpload: true,
      });
    }

    console.log(e.target.files[0]);
    this.setState({
      coverFile: e.target.files[0],
    });
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
                onChange={(e) => this.onImageChange(e, "cover")}
              />
              <label for="coverImage">
                {inputFileIcon()}
                {this.state.coverName}
              </label>
            </React.Fragment>
          </div>
        </div>
        {this.state.coverImage ? (
          <img id="target" src={this.state.coverImage} alt="" />
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
              onChange={(e) => this.handleFileUpload(e, "audio")}
              name="coverImage"
              id="coverImage"
              hidden
            />
            <label for="coverImage">
              {headphoneIcon()}
              {this.state.audioName}
            </label>
          </div>
        </div>
      </section>
    );
  };

  descriptionContent = () => {
    return (
      <section className="cover-content">
        <div className="description-input-wrapper">
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
            <p>Podcast description</p>

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
        </div>
      </section>
    );
  };

  render() {
    // this.props.showModal
    return (
      <React.Fragment>
        <Modal show={this.state.show}>
          <ProgressBar now={this.state.progressBar} />
          <Modal.Header>
            <Modal.Title>
              {this.state.progressBar === 33
                ? "Choose your cover art"
                : this.state.progressBar === 66
                ? "Add information for this podcast"
                : "Upload audio file"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs id="controlled-tab-example">
              {this.state.progressBar === 33 ? (
                <Tab eventKey="home">{this.coverContent()}</Tab>
              ) : this.state.progressBar === 66 ? (
                <Tab className="active" eventKey="profile">
                  {this.descriptionContent()}
                </Tab>
              ) : (
                <Tab eventKey="contact">{this.audioContent()}</Tab>
              )}
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <ModalButton variant="secondary" onClick={this.handleDialogReturn}>
              {this.state.progressBar === 33 ? this.state.backLabel : "Back"}
            </ModalButton>
            <ModalButton
              disabled={this.state.disabled}
              onClick={this.handleUploadSubmit}
              variant="primary"
            >
              {this.state.progressBar === 100 ? "Complete" : "Next"}
            </ModalButton>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export { UploadModal };

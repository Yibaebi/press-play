import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal, Tabs, Tab } from "react-bootstrap";
import ModalButton from "react-bootstrap/Button";
import "./uploadModal.css";
import { Button } from "../../components";
import { inputFileIcon, headphoneIcon } from "../../assets";
import { AuthenticationPage } from "../../pages/auth/authPages";

class UploadModal extends AuthenticationPage {
  constructor(props) {
    super(props);
    this.state = {
      uploadTitles: {
        cover: "Choose your cover image",
      },
      disabled: true,
      progressBar: 33,
      Label: "Next",
      backLabel: "Close",
      show: true,
      coverName: "choose cover",
      audioName: "choose audio",
      podcastDescription: {
        podcastTitle: "",
        podcastDescription: "",
      },
    };
  }

  handleDialogReturn = () => {
    const progressBar = this.state.progressBar;
    if (progressBar === 100)
      this.setState({
        progressBar: 66,
      });
    if (progressBar === 66)
      this.setState({
        progressBar: 33,
      });
    if (this.state.progressBar === 33 && this.state.backLabel === "Close") {
      this.handleModalClose();
      this.props.closeModal();
    }
  };

  handleModalClose = () => {
    this.setState({
      show: false,
    });
  };

  handleFileUpload = (e, input) => {
    if (input === "cover") {
      this.setState({ coverName: e.target.files[0].name, disabled: false });
    }
    if (input === "audio") {
      this.setState({ audioName: e.target.files[0].name });
    }
  };

  handleUploadSubmit = () => {
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

  coverContent = () => {
    return (
      <section className="cover-content">
        <div className="upload-input-container">
          <div className="content-wrapper">
            <p>Drag and drop image file here</p>
            <p>or</p>
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              hidden
              onChange={(e) => this.handleFileUpload(e, "cover")}
            />
            <label for="coverImage">
              {inputFileIcon()}
              {this.state.coverName}
            </label>
          </div>
        </div>
        <Button label="Upload cover" className="login-button cover" />
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
        <Button label="Upload audio" className="login-button cover" />
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
    return (
      <React.Fragment>
        <Modal show={this.props.showModal}>
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

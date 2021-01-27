import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal, Tabs, Tab } from "react-bootstrap";
import ModalButton from "react-bootstrap/Button";

import "./uploadModal.css";
import { Button } from "../../components";
import { inputFileIcon } from "../../assets";

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadTitles: {
        cover: "Choose your cover image",
      },

      progressBar: 33,
      Label: "Next",
      backLabel: "Close",
      show: true,
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
    if (progressBar === 33 && this.state.backLabel === "Close") {
      this.handleModalClose();
    }
  };

  handleModalClose = () => {
    this.setState({
      show: false,
    });
  };

  handleUploadSubmit = () => {
    const progressBar = this.state.progressBar;
    if (progressBar === 33)
      this.setState({
        progressBar: 66,
      });
    if (progressBar === 66)
      this.setState({
        progressBar: 100,
      });
  };

  render() {
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
                : "Finish Upload"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs id="controlled-tab-example">
              {this.state.progressBar === 33 ? (
                <Tab eventKey="home">{coverContent()}</Tab>
              ) : this.state.progressBar === 66 ? (
                <Tab className="active" eventKey="profile">
                  Number 2
                </Tab>
              ) : (
                <Tab eventKey="contact">Number 3</Tab>
              )}
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <ModalButton variant="secondary" onClick={this.handleDialogReturn}>
              {this.state.progressBar === 33 ? this.state.backLabel : "Back"}
            </ModalButton>
            <ModalButton onClick={this.handleUploadSubmit} variant="primary">
              {this.state.progressBar === 100 ? "Finish" : "Next"}
            </ModalButton>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const coverContent = () => {
  return (
    <section className="cover-content">
      <div className="upload-input-container">
        <div className="content-wrapper">
          <p>Drag and drop image file here</p>
          <p>or</p>
          <input type="file" name="coverImage" id="coverImage" hidden />
          <label for="coverImage">{inputFileIcon()}choose cover</label>
        </div>
      </div>
      <Button label="Upload cover" className="login-button cover" />
    </section>
  );
};
export { UploadModal };

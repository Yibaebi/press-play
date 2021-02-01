import React from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./dashboard.css";
import {
  uploadIcon,
  listeningIcon,
  subscribersIcon,
  likesIcon,
  draftIcon,
} from "../../../assets";

class UserDashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link id="user-dashboard-nav-item" eventKey="first">
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">View Podcasts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={true} eventKey="third">
                    <span>(Coming soon)</span> Analytics
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <main className="dashboard-main-container">
                    <div className="content-wrapper">
                      <h2>Welcome to your dashboard!</h2>
                      <h4>
                        Find all about your audience, content analytics, and
                        manage your podcasts.
                      </h4>
                      <section>
                        <section className="dashboard-analytics">
                          <aside className="analytics-box podcasts">
                            {listeningIcon()}
                            <div className="content">
                              <p>1000</p>
                              <p>Podcasts</p>
                            </div>
                          </aside>
                          <aside className="analytics-box subscribers">
                            {subscribersIcon()}
                            <div className="content">
                              <p>2000</p>
                              <p>Subscribers</p>
                            </div>
                          </aside>
                          <aside className="analytics-box likes">
                            {likesIcon()}
                            <div className="content">
                              <p>100K</p>
                              <p>Likes</p>
                            </div>
                          </aside>
                        </section>
                        <section className="upload-box">
                          <h4>Start uploading here!</h4>
                          <div className="upload-content">
                            <button
                              className="upload"
                              onClick={this.props.uploadModal}
                            >
                              {uploadIcon()}Upload podcast
                            </button>
                            <button className="draft">
                              {draftIcon()}Draft
                            </button>
                          </div>
                        </section>
                      </section>
                      <button className="upload update-profile">
                        Update profile
                      </button>
                    </div>
                  </main>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <main className="dashboard-main-container">
                    <div className="content-wrapper">
                      <h2>Manage all your episodes</h2>
                    </div>
                  </main>
                </Tab.Pane>
                <Tab.Pane eventKey="third">Third</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </React.Fragment>
    );
  }
}

export { UserDashboard };

import React from "react";
import { Tab, Tabs, Col, Nav, Row } from "react-bootstrap";
import { AuthNavBar, DashboardNavBar } from "../../../widgets";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./home.css";
import {
  recommendation1,
  recommendation2,
  recommendation3,
  recommendation4,
  recommendation5,
  angleRightIcon,
} from "../../../assets";
// import { IconLoader } from "./../../../utilities/loader/index";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="home">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link id="user-dashboard-nav-item" eventKey="first">
                      Recommendations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Trending</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link disabled={true} eventKey="third">
                      <span>(Soon)</span> Favourites
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link disabled={true} eventKey="third">
                      <span>(soon)</span> Most listened
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <main className="dashboard-main-container">
                      <div className="content-wrapper">
                        <h3>Hi Stephanie,</h3>
                        <p>Here are some podcasts we think you might like</p>

                        <section
                          id="podcast-container"
                          className="recommendations"
                        >
                          <div>
                            <div className="left-arrow">{angleRightIcon()}</div>
                            <img src={recommendation1} alt="recommendation 1" />

                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                          <div>
                            <img src={recommendation2} alt="recommendation 2" />
                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                        </section>
                        <h4>Comedy</h4>
                        <section
                          id="podcast-container"
                          className="recommendations"
                        >
                          <div>
                            <div className="left-arrow">{angleRightIcon()}</div>
                            <img src={recommendation1} alt="recommendation 1" />

                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                          <div>
                            <img src={recommendation2} alt="recommendation 2" />
                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                        </section>
                      </div>
                    </main>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <main className="dashboard-main-container">
                      <div className="content-wrapper">
                        <h3>Trending Podcasts</h3>
                        <section
                          id="podcast-container"
                          className="recommendations"
                        >
                          <div>
                            <div className="left-arrow">{angleRightIcon()}</div>
                            <img src={recommendation1} alt="recommendation 1" />

                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                          <div>
                            <img src={recommendation2} alt="recommendation 2" />
                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                        </section>
                        <h4>Most liked</h4>
                        <section
                          id="podcast-container"
                          className="recommendations"
                        >
                          <div>
                            <div className="left-arrow">{angleRightIcon()}</div>
                            <img src={recommendation1} alt="recommendation 1" />

                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                          <div>
                            <img src={recommendation2} alt="recommendation 2" />
                            <aside>
                              <p>Skip the Repeat</p>
                              <p>Kai Talim</p>
                            </aside>
                          </div>
                        </section>
                      </div>
                    </main>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">Third</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

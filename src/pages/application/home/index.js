import React from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./home.css";
import { Carousel } from "../../../widgets";
import { PodcastPage } from "../podcastPage";

class Home extends React.Component {
  state = {
    podcastId: "",
    showPodcastPage: false,
  };
  getPodcastId = (e, podcastId) => {
    this.setState({
      podcastId,
      showPodcastPage: true,
    });
  };
  hidePodcastPage = () => {
    this.setState({
      showPodcastPage: false,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div id="home">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link id="user-dashboard-nav-item" eventKey="first">
                  Recommendations
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Trending</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <main className="dashboard-main-container">
                  {this.state.showPodcastPage ? (
                    <PodcastPage
                      podcastId={this.state.podcastId}
                      hidePodcastPage={this.hidePodcastPage}
                    />
                  ) : (
                    <React.Fragment>
                      <div className="content-wrapper">
                        <div>
                          <h3 className="m-15">Hi, {this.props.user}!</h3>
                          <p className="m-15">
                            Here are some podcasts we think you might like
                          </p>

                          <section
                            id="podcast-container"
                            className="recommendations"
                          >
                            <Carousel
                              viewPodcast={this.viewPodcast}
                              getPodcastId={this.getPodcastId}
                            />
                          </section>
                          <section
                            id="podcast-container"
                            className="recommendations"
                          >
                            <Carousel
                              viewPodcast={this.viewPodcast}
                              getPodcastId={this.getPodcastId}
                            />
                          </section>
                          <section
                            id="podcast-container"
                            className="recommendations"
                          >
                            <Carousel
                              viewPodcast={this.viewPodcast}
                              getPodcastId={this.getPodcastId}
                            />
                          </section>
                          <section
                            id="podcast-container"
                            className="recommendations"
                          >
                            <Carousel
                              viewPodcast={this.viewPodcast}
                              getPodcastId={this.getPodcastId}
                            />
                          </section>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </main>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <main className="dashboard-main-container">
                  <div className="content-wrapper">
                    <div>
                      <h4 className="m-15">Trending Podcasts</h4>
                      <section
                        id="podcast-container"
                        className="recommendations"
                      >
                        <Carousel
                          viewPodcast={this.viewPodcast}
                          getPodcastId={this.getPodcastId}
                        />
                      </section>
                      <h4>Most liked</h4>
                      <section
                        id="podcast-container"
                        className="recommendations"
                      >
                        <Carousel
                          viewPodcast={this.viewPodcast}
                          getPodcastId={this.getPodcastId}
                        />
                      </section>
                    </div>
                  </div>
                </main>
              </Tab.Pane>
              <Tab.Pane eventKey="third">Third</Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </React.Fragment>
    );
  }
}

export { Home };

import React from "react";
import { getAllPodcasts } from "../../api/auth/podcastService";
import { Arrow } from "../../utilities";
import { ImageSlide } from "../../utilities/imageSlider";
import "./carousel.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImageIndex: 0,
      podcasts: [],
    };
  }

  async componentDidMount() {
    try {
      const podcasts = await getAllPodcasts();
      console.log(podcasts.data);
      this.setState({
        podcasts: podcasts.data,
      });
    } catch (error) {}
  }

  previousSlide = () => {
    const lastIndex = this.state.podcasts.length - 4;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

    this.setState({
      currentImageIndex: index,
    });
  };

  nextSlide = () => {
    const lastIndex = this.state.podcasts.length - 1;
    const { currentImageIndex } = this.state;
    const shouldResetIndex = currentImageIndex + 3 === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;

    this.setState({
      currentImageIndex: index,
    });
  };

  render() {
    return this.state.podcasts.length ? (
      <React.Fragment>
        <div className="carousel">
          <Arrow
            direction="left"
            clickFunction={this.previousSlide}
            glyph="&#9664;"
          />

          <div className="carousel-image-container">
            <ImageSlide
              getPodcastId={this.props.getPodcastId}
              url={
                this.state.podcasts[this.state.currentImageIndex].coverImageUrl
              }
              podcastId={this.state.podcasts[this.state.currentImageIndex]._id}
              author={
                this.state.podcasts[
                  this.state.currentImageIndex
                ].userId.substring(0, 10) + "..."
              }
              title={
                this.state.podcasts[this.state.currentImageIndex].title.length >
                10
                  ? this.state.podcasts[
                      this.state.currentImageIndex
                    ].title.substring(0, 10) + "..."
                  : this.state.podcasts[this.state.currentImageIndex].title
              }
            />
            <ImageSlide
              getPodcastId={this.props.getPodcastId}
              url={
                this.state.podcasts[this.state.currentImageIndex + 1]
                  .coverImageUrl
              }
              podcastId={
                this.state.podcasts[this.state.currentImageIndex + 1]._id
              }
              author={
                this.state.podcasts[
                  this.state.currentImageIndex + 1
                ].userId.substring(0, 10) + "..."
              }
              title={
                this.state.podcasts[this.state.currentImageIndex + 1].title
                  .length > 10
                  ? this.state.podcasts[
                      this.state.currentImageIndex + 1
                    ].title.substring(0, 10) + "..."
                  : this.state.podcasts[this.state.currentImageIndex + 1].title
              }
            />
            <ImageSlide
              getPodcastId={this.props.getPodcastId}
              url={
                this.state.podcasts[this.state.currentImageIndex + 2]
                  .coverImageUrl
              }
              podcastId={
                this.state.podcasts[this.state.currentImageIndex + 2]._id
              }
              author={
                this.state.podcasts[
                  this.state.currentImageIndex + 2
                ].userId.substring(0, 10) + "..."
              }
              title={
                this.state.podcasts[this.state.currentImageIndex + 2].title
                  .length > 10
                  ? this.state.podcasts[
                      this.state.currentImageIndex + 2
                    ].title.substring(0, 10) + "..."
                  : this.state.podcasts[this.state.currentImageIndex + 2].title
              }
            />
            <ImageSlide
              getPodcastId={this.props.getPodcastId}
              url={
                this.state.podcasts[this.state.currentImageIndex + 3]
                  .coverImageUrl
              }
              podcastId={
                this.state.podcasts[this.state.currentImageIndex + 3]._id
              }
              author={
                this.state.podcasts[
                  this.state.currentImageIndex + 3
                ].userId.substring(0, 10) + "..."
              }
              title={
                this.state.podcasts[this.state.currentImageIndex + 3].title
                  .length > 10
                  ? this.state.podcasts[
                      this.state.currentImageIndex + 3
                    ].title.substring(0, 10) + "..."
                  : this.state.podcasts[this.state.currentImageIndex + 3].title
              }
            />
          </div>
          <Arrow
            direction="right"
            clickFunction={this.nextSlide}
            glyph="&#9654;"
          />
        </div>
      </React.Fragment>
    ) : (
      <div id="carousel-empty">
        <h4>Podcasts are loading please wait...</h4>
      </div>
    );
  }
}

export { Carousel };

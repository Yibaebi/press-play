import React from "react";
import {
  getAllUserSubscriptions,
  unsubscribeToAPodcast,
} from "../../../api/auth/podcastService";
import { noSubIcon } from "../../../assets/icons";
import { IconLoaderVariant1 } from "../../../utilities";
import { ImageSlide } from "../../../utilities/imageSlider";
import { PodcastPage } from "../podcastPage";
import "./subscription.css";

class SubscriptionsPage extends React.Component {
  state = {
    loading: true,
    subscriptions: [],
    subscribed: false,
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

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      const subscriptionsResponse = await getAllUserSubscriptions();
      console.log(subscriptionsResponse.data.data);

      if (subscriptionsResponse.data.data) {
        this.setState({
          loading: false,
          subscriptions: subscriptionsResponse.data.data,
        });
      }
    } catch (error) {}
  }

  handleUnsubscribe = async (e, podcastId) => {
    console.log("Unsubcribe from: ", podcastId);

    try {
      const unsubscribeResponse = await unsubscribeToAPodcast(podcastId);
      console.log(unsubscribeResponse.data.data);

      if (unsubscribeResponse.status) {
        const subscriptionsResponse = await getAllUserSubscriptions();
        if (subscriptionsResponse.data.data) {
          this.setState({
            subscriptions: subscriptionsResponse.data.data,
          });
        }
      }
    } catch (error) {
      alert("Failed");
    }
  };

  render() {
    const { subscriptions } = { ...this.state };

    const subscriptionsList = subscriptions.map((subscription) => (
      <ImageSlide
        key={subscription._id}
        url={subscription.coverImageUrl}
        title={subscription.title.substring(0, 11) + "..."}
        podcastId={subscription._id}
        subscribed={true}
        unsubscribe={this.handleUnsubscribe}
        getPodcastId={this.getPodcastId}
      />
    ));
    return (
      <React.Fragment>
        <div id="home">
          <section id="subscriptions-main-container">
            {this.state.showPodcastPage ? (
              <PodcastPage
                playerLaunch={this.props.playerLaunch}
                podcastId={this.state.podcastId}
                hidePodcastPage={this.hidePodcastPage}
              />
            ) : this.state.loading ? (
              <IconLoaderVariant1 />
            ) : subscriptionsList.length ? (
              subscriptionsList
            ) : (
              <div className="error-container">
                {noSubIcon()}
                <p>You dont have any subscriptions yet.</p>
              </div>
            )}
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export { SubscriptionsPage };

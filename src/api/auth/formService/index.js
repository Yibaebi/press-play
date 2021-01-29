import http from "../httpService";
import { podcastUrl } from "../../../config.json";

function capturePodcastDetails(
  coverImage,
  podcastTitle,
  podcastDescription,
  userID
) {
  console.log(coverImage, podcastTitle, podcastDescription, userID);
  const podcastData = new FormData();
  podcastData.append("coverImage", coverImage);
  podcastData.append("title", podcastTitle);
  podcastData.append("description", podcastDescription);
  podcastData.append("userId", userID);

  for (var key of podcastData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  return podcastData;
}

function uploadPodcastDetails(podcastData) {
  const apiEndpoint = podcastUrl;
  return http.post(apiEndpoint, podcastData);
}

export { capturePodcastDetails, uploadPodcastDetails };

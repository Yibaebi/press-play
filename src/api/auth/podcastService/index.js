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
  console.log("Uploading podcasts");
  const apiEndpoint = podcastUrl;
  return http.post(apiEndpoint, podcastData);
}

function deletePodcast(podcastId) {
  const apiEndpoint = `${podcastUrl}/${podcastId}`;
  return http.delete(apiEndpoint);
}

function updatePodcast(podcastData, userId) {
  console.log("Updating podcasts");
  const apiEndpoint = podcastUrl + `/${userId}`;
  return http.put(apiEndpoint, podcastData);
}
function getAllPodcasts() {
  const apiEndpoint = podcastUrl;
  return http.get(apiEndpoint);
}

function getAPodcast(podcastId) {
  const apiEndpoint = `${podcastUrl}/${podcastId}`;
  return http.get(apiEndpoint);
}

export {
  capturePodcastDetails,
  uploadPodcastDetails,
  deletePodcast,
  updatePodcast,
  getAllPodcasts,
  getAPodcast,
};

import http from "../httpService";
import { podcastUrl, apiUrl } from "../../../config.json";

const userToken = localStorage.getItem("token");
console.log(userToken);
const userDetails = JSON.parse(localStorage.getItem("userDetails"));
console.log(userDetails);

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
  return http.post(apiEndpoint, podcastData, {
    headers: {
      authorization: `${userToken}`,
    },
  });
}

function deletePodcast(podcastId) {
  const apiEndpoint = `${podcastUrl}/${podcastId}`;
  return http.delete(apiEndpoint, {
    headers: {
      authorization: `${userToken}`,
    },
  });
}

function updatePodcast(podcastData, podcastId) {
  console.log("Updating podcasts");
  const apiEndpoint = podcastUrl + `/${podcastId}`;
  return http.put(apiEndpoint, podcastData, {
    headers: {
      authorization: `${userToken}`,
    },
  });
}
function getAllPodcasts() {
  const apiEndpoint = podcastUrl;
  return http.get(apiEndpoint);
}

function getAPodcast(podcastId) {
  const apiEndpoint = `${podcastUrl}/${podcastId}`;
  return http.get(apiEndpoint);
}
function getAllPodcastsOfUser() {
  const apiEndpoint = `${apiUrl}/podcasts`;
  return http.get(apiEndpoint, {
    headers: {
      authorization: `${userToken}`,
    },
  });
}

function subscribeToAPodcast(podcastId) {
  const apiEndpoint = `${apiUrl}/subscribe/${podcastId}`;
  return http.post(
    apiEndpoint,
    {},
    {
      headers: { authorization: `${userToken}` },
    }
  );
}
function unsubscribeToAPodcast(podcastId) {
  const apiEndpoint = `${apiUrl}/unsubscribe/${podcastId}`;
  return http.put(
    apiEndpoint,
    {},
    {
      headers: { authorization: `${userToken}` },
    }
  );
}

function getAllUserSubscriptions(podcastId) {
  const apiEndpoint = `${apiUrl}/subscriptions`;
  return http.get(apiEndpoint, {
    headers: { authorization: `${userToken}` },
  });
}

export {
  capturePodcastDetails,
  uploadPodcastDetails,
  deletePodcast,
  updatePodcast,
  getAllPodcasts,
  getAPodcast,
  subscribeToAPodcast,
  unsubscribeToAPodcast,
  getAllPodcastsOfUser,
  getAllUserSubscriptions,
};

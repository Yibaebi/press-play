import http from "../httpService";
import { episodeUrl, podcastUrl, likeAndUnlike } from "../../../config.json";

const userToken = localStorage.getItem("token");

function captureEpisodeDetails(
  episodeAudio,
  episodeTitle,
  episodeDescription,
  podcastId
) {
  console.log(episodeAudio, episodeTitle, episodeDescription, podcastId);
  const episodeData = new FormData();

  episodeData.append("title", episodeTitle);
  episodeData.append("description", episodeDescription);
  episodeData.append("podcastId", podcastId);
  episodeData.append("episodeAudio", episodeAudio);

  return episodeData;
}

function captureEpisodeUpdateDetails(
  episodeAudio,
  episodeTitle,
  episodeDescription
) {
  console.log(episodeAudio, episodeTitle, episodeDescription);
  const episodeData = new FormData();

  episodeData.append("title", episodeTitle);
  episodeData.append("description", episodeDescription);
  episodeData.append("episodeAudio", episodeAudio);

  return episodeData;
}

function uploadEpisode(episodeData) {
  for (var key of episodeData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  const apiEndpoint = episodeUrl;
  return http.post(apiEndpoint, episodeData, {
    headers: { authorization: `${userToken}` },
  });
}

function deleteEpisode(episodeId) {
  const apiEndpoint = `${episodeUrl}/${episodeId}`;
  return http.delete(apiEndpoint, {
    headers: {
      authorization: `${userToken}`,
    },
  });
}

function updateEpisode(episodeData, episodeId) {
  delete episodeData.podcastId;
  for (var key of episodeData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  const apiEndpoint = episodeUrl + `/${episodeId}`;
  return http.put(apiEndpoint, episodeData, {
    headers: {
      authorization: `${userToken}`,
    },
  });
}

function getAllEpisodes() {
  const apiEndpoint = episodeUrl;
  return http.get(apiEndpoint);
}

function getAnEpisode(episodeId) {
  const apiEndpoint = `${episodeUrl}/${episodeId}`;
  return http.get(apiEndpoint);
}

function getAllEpisodesOfAPodcast(podcastId) {
  const apiEndpoint = `${podcastUrl}/${podcastId}/episodes`;
  return http.get(apiEndpoint);
}
function getAllUserLikes() {
  const apiEndpoint = `${likeAndUnlike}/likes`;
  return http.get(apiEndpoint, {
    headers: {
      authorization: `${userToken}`,
    },
  });
}

function likeAnEpisode(episodeId) {
  const apiEndpoint = `${likeAndUnlike}/like/${episodeId}`;
  return http.post(
    apiEndpoint,
    {},
    {
      headers: { authorization: `${userToken}` },
    }
  );
}
function unlikeAnEpisode(episodeId) {
  const apiEndpoint = `${likeAndUnlike}/unlike/${episodeId}`;
  return http.put(
    apiEndpoint,
    {},
    {
      headers: { authorization: `${userToken}` },
    }
  );
}

export {
  captureEpisodeDetails,
  captureEpisodeUpdateDetails,
  uploadEpisode,
  deleteEpisode,
  updateEpisode,
  getAllEpisodes,
  getAnEpisode,
  getAllEpisodesOfAPodcast,
  likeAnEpisode,
  unlikeAnEpisode,
  getAllUserLikes,
};

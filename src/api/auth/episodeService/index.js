import http from "../httpService";
import { episodeUrl, podcastUrl, likeAndUnlike } from "../../../config.json";

const userToken = localStorage.getItem("token");
console.log(userToken);

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

function uploadEpisode(episodeData) {
  for (var key of episodeData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  const apiEndpoint = episodeUrl;
  return http.post(apiEndpoint, episodeData);
}

function deleteEpisode(episodeId) {
  const apiEndpoint = `${episodeUrl}/${episodeId}`;
  return http.delete(apiEndpoint);
}

function updateEpisode(episodeData) {
  const apiEndpoint = episodeUrl;
  return http.put(apiEndpoint, episodeData);
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
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDEzZTVlNGZmODMyMDAwMDRiYzNkY2QiLCJpYXQiOjE2MTI4MTI0NzcsImV4cCI6MTYxMjg5ODg3N30.eD_9oy_yyMkhIAewJeT45-oguJs7kQWD4jhTxHFndGs`,
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

import http from "../httpService";
import { episodeUrl, podcastUrl } from "../../../config.json";
import flydown from "../../../assets/Fly Down.mp3";

function captureEpisodeDetails(
  episodeAudio,
  episodeTitle,
  episodeDescription,
  podcastId
) {
  console.log(episodeAudio, episodeTitle, episodeDescription, podcastId);
  const episodeData = new FormData();
  episodeData.append("title", "episodeTitle");
  episodeData.append("description", "episodeDescription");
  episodeData.append("podcastId", "601bf9ab627d8c00043aa0da");
  episodeData.append("episodeAudio", flydown);

  for (var key of episodeData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  return episodeData;
}

function uploadEpisode(episodeData) {
  const apiEndpoint = episodeUrl;
  return http.post(apiEndpoint, episodeData, {
    authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDEzZTVlNGZmODMyMDAwMDRiYzNkY2QiLCJpYXQiOjE2MTI1MzIxODIsImV4cCI6MTYxMjYxODU4Mn0.y0ImUJpCqj_he0lypMnUCsuQl1klUbfJn8cwHhdp61U",
  });
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

export {
  captureEpisodeDetails,
  uploadEpisode,
  deleteEpisode,
  updateEpisode,
  getAllEpisodes,
  getAnEpisode,
  getAllEpisodesOfAPodcast,
};

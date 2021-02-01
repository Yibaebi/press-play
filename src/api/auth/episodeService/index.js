import http from "../httpService";
import { episodeUrl, podcastUrl } from "../../../config.json";
import flydown from "../../../assets/Distant Moon.mp3";

function captureEpisodeDetails(
  episodeAudio,
  episodeTitle,
  episodeDescription,
  podcastId
) {
  console.log(episodeAudio, episodeTitle, episodeDescription, podcastId);
  const episodeData = new FormData();
  episodeData.append("episodeAudio", flydown);
  episodeData.append("title", episodeTitle);
  episodeData.append("description", episodeDescription);
  episodeData.append("podcastId", "6015ebd56c1954000446cc30");

  for (var key of episodeData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }

  return episodeData;
}

function uploadEpisode(episodeData) {
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

export {
  captureEpisodeDetails,
  uploadEpisode,
  deleteEpisode,
  updateEpisode,
  getAllEpisodes,
  getAnEpisode,
  getAllEpisodesOfAPodcast,
};

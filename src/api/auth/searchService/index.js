import http from "../httpService";
import { podcastUrl } from "../../../config.json";

const searchService = (searchQuery) => {
  const apiEndpoint = `${podcastUrl}/search/${searchQuery}`;
  return http.get(apiEndpoint);
};

export { searchService };

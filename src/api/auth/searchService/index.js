import http from "../httpService";
import {podcastUrl} from "../../../config.json";

const searchService  = (title) => {
    const apiEndpoint =`${podcastUrl}/search/${title}` ;
     return (http.get(apiEndpoint)) ;
    };
    export { searchService }; 
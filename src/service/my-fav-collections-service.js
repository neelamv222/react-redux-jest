import axios from 'axios';

// asyc call to fetch list of collections.
const myFavCollectionsService = (item) => {
  const url = item;
  return axios.get(`${url}.json`);
};

export default myFavCollectionsService;

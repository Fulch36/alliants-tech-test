// ALLIANTS APP - API HANDLER

// Axios config
const apiTimeout = 5000;
const url = window.location.protocol + '//' + window.location.host + '/api';
const apiHandler = axios.create({
  baseURL: url,
  timeout: apiTimeout,
  headers: {
    'Accept': 'application/json'
  }
});

// Search YouTube for videos with a given tag
function getVideos(query, limit) {
  const targetParams = {
    searchTerm: query,
    itemLimit: limit
  };

  return new Promise(async (resolve, reject) => {
    let result = await apiHandler.get('/youtube', { params: targetParams });

    if (result.data.success) {
      resolve(result.data.data);
    } else {
      reject(result.data.errorMessage);
    }
  });
}

// Search Flickr for images with a given tag
function getImages(query, limit) {
  const targetParams = {
    searchTerm: query,
    itemLimit: limit
  };

  return new Promise(async (resolve, reject) => {
    let result = await apiHandler.get('/flickr', { params: targetParams });

    if (result.data.success) {
      resolve(result.data.data);
    } else {
      reject(result.data.errorMessage);
    }
  });
}

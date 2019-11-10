// ALLIANTS APP - MAIN

// **** FUTURE IMPROVEMENTS ***

// Would be nice to show a given number of images and videos on the page
// Should probably include an integration test as well

// ****************************

// Config
const itemLimit = 1;

// First validate search term, then get images and videos
async function getSearch() {
  if (document.getElementById('search').value !== '') {
    try {
      showLoader(true);
      let videosRequest = getVideos(document.getElementById('search').value, itemLimit);
      let imagesRequest = getImages(document.getElementById('search').value, itemLimit);
      [videosResult, imagesResult] = await Promise.all([videosRequest, imagesRequest]);

      if (videosResult.length > 0 && imagesResult.length > 0) {
        setVideo('https://www.youtube.com/embed/' + videosResult[0].id.videoId);
        setImage(imagesResult[0].media.m);
        setImageLink(imagesResult[0].link);
        advanceToNextTab();
        showLoader(false);
      } else {
        noResultsError();
      }
    } catch (error) {
      console.error(error);
      apiError();
    }
  }
  else {
    searchError();
  }
}

// Set video to be displayed
function setVideo(url) {
  document.getElementById('video-result').setAttribute('src', url);
}

// Set image to be displayed
function setImage(url) {
  document.getElementById('image-result').src = url;
}

// Set hyperlink on image to be displayed
function setImageLink(url) {
  document.getElementById('image-result-link').href = url;
}

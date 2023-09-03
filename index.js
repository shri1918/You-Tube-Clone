// const API_KEY ='AIzaSyDStK3AJhZVAFDSGoK3_5GghsPN_nuRavI';
// const url ='https://www.googleapis.com/youtube/v3';


// const searchButton = document.getElementById('searchButton');
// const videoSearch = document.getElementById('searchinput');





const API_KEY = 'AIzaSyDStK3AJhZVAFDSGoK3_5GghsPN_nuRavI'; // Replace with your actual YouTube API key
const url = 'https://www.googleapis.com/youtube/v3';

const searchButton = document.getElementById('searchButton');
const videoSearch = document.getElementById('searchinput');
const cardContainer = document.getElementById('cardContainer');
const template = document.getElementById('temp');

window.addEventListener('load', () => fetchVideo('India'));

async function fetchVideo(query) {
  const maxResults = 20;
  const endpoint = `${url}/search?key=${API_KEY}&q=${query}&part=snippet&maxResults=${maxResults}`;
  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    bindData(data.items);
  } catch (error) {
    console.error('An error occurred:', error);
    alert('Some error occurred');
  }
}

searchButton.addEventListener('click', () => {
  const query = videoSearch.value;
  if (!query) return;
  fetchVideo(query);
});

function bindData(videos) {
  cardContainer.innerHTML = '';

  if (!videos || videos.length === 0) {
    // Handle the case when no videos are available
    cardContainer.innerHTML = '<p>No videos found.</p>';
    return;
  }

  videos.forEach(video => {
    const cardClone = template.content.cloneNode(true);
    const thumbnail = cardClone.querySelector('#thumbnail');
    const videoTitle = cardClone.querySelector('#video_title');
    const channelLogo = cardClone.querySelector('#channel-logo'); // Fixed variable name

    thumbnail.src = video.snippet.thumbnails.default.url;
    videoTitle.textContent = video.snippet.title;

    // Accessing the channel logo URL
    const channelLogoUrl = video.snippet.thumbnails.medium.url;
    channelLogo.src = channelLogoUrl;

    cardClone.firstElementChild.addEventListener('click', () => {
      // Open the video in a new tab or window
      window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`);
    });

    cardContainer.appendChild(cardClone);
  });
}

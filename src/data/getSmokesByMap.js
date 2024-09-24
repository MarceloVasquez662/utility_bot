
import {google} from "googleapis"

const PLAYLIST_ID = process.env.SMOKES_PLAYLIST_KEY;

export default async function getSmokesByMap(map) {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY,
  });

  try {
    const response = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId: PLAYLIST_ID,
      maxResults: 50,
    });

    const videos = response.data.items;

    if (!videos.length) {
      console.log('No se encontraron videos en la lista de reproducción.');
      return;
    }

    const zones = videos
    .filter((video) => video.snippet.title.startsWith(map))
    .map((video) => {
      const title = video.snippet.title;
      const [mapAndSite, name] = title.split('-');
      const videoId = video.snippet.resourceId.videoId;
      return { name: name, videoId: videoId };
    });

    if (zones.length === 0) {
      console.log('No se encontraron videos que comiencen con:', map);
    } else {
      return zones
    }
  } catch (error) {
    console.error('Error al obtener los videos:', error.message);
  }
}
import {google} from "googleapis"

const PLAYLIST_ID = process.env.SMOKES_PLAYLIST_KEY;

export default async function getMaps() {
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

    const maps = videos.map((video) => {
      const title = video.snippet.title;
      const [map] = title.split('-');
      return map.trim();
    });

    return maps
  } catch (error) {
    console.error('Error al obtener los videos:', error.message);
  }
}
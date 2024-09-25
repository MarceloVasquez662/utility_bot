import { google } from "googleapis";

const PLAYLIST_ID = process.env.SMOKES_PLAYLIST_KEY;

export default async function getMaps() {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_KEY,
  });

  try {
    let nextPageToken = null;
    const allVideos = [];

    do {
      const response = await youtube.playlistItems.list({
        part: 'snippet',
        playlistId: PLAYLIST_ID,
        maxResults: 50,
        pageToken: nextPageToken,
      });

      const videos = response.data.items;
      allVideos.push(...videos);

      nextPageToken = response.data.nextPageToken;

    } while (nextPageToken);

    if (!allVideos.length) {
      console.log('No se encontraron videos en la lista de reproducción.');
      return [];
    }

    const maps = [...new Set([...allVideos.map((video) => {
      const title = video.snippet.title;
      const [map] = title.split('-');
      return map.trim();
    })])];

    return maps;
  } catch (error) {
    console.error('Error al obtener los videos:', error.message);
    return [];
  }
}
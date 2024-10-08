import { google } from "googleapis";

const PLAYLIST_ID = process.env.MOLOS_PLAYLIST_KEY;

export default async function getMolosByMap(map) {
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
      return;
    }

    const zones = allVideos
      .filter((video) => video.snippet.title.startsWith(map))
      .map((video) => {
        const title = video.snippet.title;
        const [mapAndSite, name] = title.split('-');
        const videoId = video.snippet.resourceId.videoId;
        return { name: name.charAt(0).toUpperCase() + name.slice(1), videoId: videoId };
      });

    if (zones.length === 0) {
      console.log('No se encontraron videos que comiencen con:', map);
    } else {
      return zones.sort((a, b) => a.name.localeCompare(b.name));
    }
  } catch (error) {
    console.error('Error al obtener los videos:', error.message);
  }
}
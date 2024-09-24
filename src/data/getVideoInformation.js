import { google } from 'googleapis';

export default async function getVideoInformation(videoId) {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.GOOGLE_API_KEY,
    });
  
    try {
      const response = await youtube.videos.list({
        part: 'snippet',
        id: videoId,
      });
  
      const videos = response.data.items;
  
      if (!videos.length) {
        console.log('No se encontró el video con el ID proporcionado.');
        return;
      }
  
      const video = videos[0];
      const title = video.snippet.title;
      const description = video.snippet.description;
      const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
  
      return {
        title: title,
        description: description,
        url: videoUrl,
      }
    } catch (error) {
      console.error('Error al obtener los detalles del video:', error.message);
    }
  }
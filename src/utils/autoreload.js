import fetch from 'node-fetch';

export default function reloadWebsite() {
    fetch(process.env.AUTOHOST)
      .then(response => {
        console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
      })
      .catch(error => {
        console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
      });
  }
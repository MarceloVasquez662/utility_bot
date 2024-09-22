import fetch from 'node-fetch';
import dotenv from 'dotenv'; 

dotenv.config()

export default async function getSmokes(){
    const url = process.env.URL_JSON;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error en la red');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el JSON:', error);
    }
};
import { readFile } from 'fs/promises';
import { dirname, join} from 'path';
import { fileURLToPath } from 'url';

export default async function getSmokes(){
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const jsonPath = join(__dirname, '..', 'data/smokes.json');
        const data = await readFile(jsonPath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the JSON file:', error);
    }
}
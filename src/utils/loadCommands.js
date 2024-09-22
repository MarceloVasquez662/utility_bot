import fs from "fs/promises"
import { dirname, join} from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

export default async function loadCommands(Client) {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const commandPath = join(__dirname, '..', 'slash_commands');
      const commandFiles = await fs.readdir(commandPath);
  
      for (const commandFile of commandFiles) {
        const filePath = pathToFileURL(`${commandPath}\\${commandFile}`).href;
        const command = await import(filePath);
        Client.commands.set(command.command.data.name, command.command);
      }
    } catch (error) {
      console.error('Error al cargar los comandos:', error);
    }
  }
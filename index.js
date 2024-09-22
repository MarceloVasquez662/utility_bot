import * as Discord from "discord.js";
import dotenv from 'dotenv'; 
import express from "express"
import fs from "fs/promises"

const Client = new Discord.Client({
    intents: 3276799,
})
dotenv.config()
Client.commands = new Discord.Collection();
const REST = new Discord.REST().setToken(process.env.TOKEN);
const app = express();
const port = process.env.PORT || 3000;

async function loadCommands() {
    try {
      const commandFiles = await fs.readdir("./src/slash_commands");
  
      for (const commandFile of commandFiles) {
        const command = await import(`./src/slash_commands/${commandFile}`);
        Client.commands.set(command.command.data.name, command.command);
      }
    } catch (error) {
      console.error('Error al cargar los comandos:', error);
    }
  }

Client.on('interactionCreate', async (interaction) => {
    
     if (interaction.isCommand()) {
        const command = Client.commands.get(interaction.commandName);
        
        if (!command) return;

        await command.execute(interaction);
    }

    if (interaction.isAutocomplete()) {
        const command = Client.commands.get(interaction.commandName);

        if (!command) return;

        await command.autocomplete(interaction);
    }
});

const initialize = async () => {
    try {
        await loadCommands()
        await REST.put(
            Discord.Routes.applicationCommands(process.env.APP_ID), {
                body: Client.commands.map((cmd) => cmd.data.toJSON())
            }
        )
        console.log("Comandos cargados")
    } catch(error) {
        console.log("Error al cargar los comandos " + error)
    }
};

Client.login(process.env.OAUTH_TOKEN)
initialize()

app.get('/', (req, res) => {
    res.send('Bot de Discord está corriendo!');
  });
  
app.listen(port, () => {
    console.log(`Bot de Discord está corriendo en el puerto ${port}`);
});


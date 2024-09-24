import * as Discord from "discord.js";
import dotenv from 'dotenv'; 
import reloadWebsite from "./src/utils/autoreload.js"
import loadCommands from "./src/utils/loadCommands.js"
import "./src/utils/expressSetup.js"

const Client = new Discord.Client({
    intents: 3276799,
})
dotenv.config()
Client.commands = new Discord.Collection();
const REST = new Discord.REST().setToken(process.env.TOKEN);

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
        await loadCommands(Client)
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
setInterval(() => reloadWebsite(), process.env.AUTORELOAD_INTERVAL);

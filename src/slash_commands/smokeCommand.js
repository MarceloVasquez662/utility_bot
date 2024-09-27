import {SlashCommandBuilder} from "discord.js";
import getMaps from "../data/getMaps.js";
import getSmokesByMap from "../data/getSmokesByMap.js"
import smokeExecutable from "../executables/smoke.js"; 

const mapNames = await getMaps();
let mapGroup = []

mapNames.map(mapName => { 
    let mapLabel = mapName
        .split('.')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    let map = mapName
    mapGroup.push({name: mapLabel, value: map})
})
mapGroup.sort((a, b) => a.name.localeCompare(b.name));

export const command = {
    data: new SlashCommandBuilder()
        .setName("smoke")
        .setDescription("Genera ahora tu smoke")
        .addStringOption(map =>
            map.setName('map')
                .setDescription('Elige el mapa')
                .setRequired(true)
                .addChoices(mapGroup))
        .addStringOption(zone =>
            zone.setName('zone')
                .setDescription('Elige una zona')
                .setAutocomplete(true)
                .setRequired(true)),
    
    async execute(interaction) {
        const videoId = interaction.options.getString('zone');
        await smokeExecutable(interaction, videoId);
    },

    async autocomplete(interaction) {
        try {
            const selectedMap = interaction.options.getString('map');
            const letterToFilterVideo = interaction.options.getString('zone');
            let zones = await getSmokesByMap(selectedMap);

            const zonesFiltered = zones
                .filter(zone => zone.name.toLowerCase().includes(letterToFilterVideo.toLowerCase()))
                .map(zone => ({
                    name: zone.name,                
                    value: String(zone.videoId)
                }))

            await interaction.respond(zonesFiltered.length == 0 ? zones:zonesFiltered);
        } catch(error) {
            console.log("Error " + error)
        }
    }
};
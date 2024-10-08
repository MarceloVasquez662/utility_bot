import {SlashCommandBuilder} from "discord.js";
import getMaps from "../data/getMoloMaps.js";
import getMolosByMap from "../data/getMolosByMap.js"
import moloExecutable from "../executables/molo.js"; 

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
        .setName("molo")
        .setDescription("Genera ahora tu molo")
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
        await moloExecutable(interaction, videoId);
    },

    async autocomplete(interaction) {
        try {
            const selectedMap = interaction.options.getString('map');
            const letterToFilterVideo = interaction.options.getString('zone');
            let zones = await getMolosByMap(selectedMap);

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
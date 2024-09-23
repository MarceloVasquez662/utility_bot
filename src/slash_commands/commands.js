import {SlashCommandBuilder} from "discord.js";
import getSmokes from "../data/getSmokes.js";
import smokeExecutable from "../executables/smoke.js"; 

const smokes = await getSmokes();
const mapNames = Object.keys(smokes)
let mapGroup = []

mapNames.map(mapName => { 
    let mapLabel = smokes[mapName].map_label
    let map = mapName
    mapGroup.push({name: mapLabel, value: map})
})

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
        const map = interaction.options.getString('map');
        const zone = interaction.options.getString('zone');

        await smokeExecutable(interaction, map, zone);
    },

    async autocomplete(interaction) {
        const selectedMap = interaction.options.getString('map');
        const focusedValue = interaction.options.getFocused();
        let zones = [];

        Object.keys(smokes[selectedMap].smokes).forEach(zone => {
            zones.push({ name: zone, value: zone });
        });

        const filtered = zones.filter(zone => zone.name.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(zone => ({ name: zone.name, value: zone.value }))
        );
    }
};
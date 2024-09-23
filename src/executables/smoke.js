import getSmokes from "../data/getSmokes.js";

export default async function smokeExecutable(interaction, selectedMap, zone){
        const smokesData = await getSmokes()
        const {smoke, description} = smokesData[selectedMap].smokes[zone]
        const mapName = smokesData[selectedMap].map_label

        if(undefined === smoke) {
            interaction.reply(`No seleccionaste un humo valido 🙉`);
        } else {
            interaction.reply(
            `🚀 Aqui va tu smoke de ${mapName} - ${zone}
📋 Descripción: ${description}    
📷 Imagen de referencia: ${smoke}`);
        }
};
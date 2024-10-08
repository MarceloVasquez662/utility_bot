import getVideoInformation from "../data/getVideoInformation.js"

export default async function moloExecutable(interaction, videoId){
        const moloData = await getVideoInformation(videoId)

        if(undefined === moloData || null === moloData) {
            interaction.reply({content: `No seleccionaste un molo valido 🙉`, ephemeral: true });
        } else {
            interaction.reply(
            `🚀 Aqui va tu molo
📋 Descripción: ${moloData.description}    
📷 Video de referencia: ${moloData.url}`);
        }
};
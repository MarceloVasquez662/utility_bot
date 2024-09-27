import getVideoInformation from "../data/getVideoInformation.js"

export default async function smokeExecutable(interaction, videoId){
        const smokeData = await getVideoInformation(videoId)

        if(undefined === smokeData || null === smokeData) {
            interaction.reply({content: `No seleccionaste un humo valido 🙉`, ephemeral: true });
        } else {
            interaction.reply({content:
            `🚀 Aqui va tu smoke
📋 Descripción: ${smokeData.description}    
📷 Video de referencia: ${smokeData.url}`,
 ephemeral: true});
        }
};
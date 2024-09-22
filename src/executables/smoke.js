import getSmokes from "../data/getSmokes.js";

export default async function smokeExecutable(interaction, selectedMap, zone){
        const smoke = await getSmokes()
            .then(smoke => smoke[selectedMap][zone]);

        if(undefined === smoke) {
            interaction.reply(`No seleccionaste un humo valido 🙉`);
        } else {
            interaction.reply(`Aqui va tu smoke de ${selectedMap} - ${zone} 😎 \n Imagen de referencia: ${smoke}`);
        }
};
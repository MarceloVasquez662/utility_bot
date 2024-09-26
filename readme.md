# Counter-Strike Guatones Team Utility Bot

Este bot de Discord está diseñado para buscar y enviar videos de YouTube relacionados con Counter-Strike 2. Los usuarios pueden utilizar comandos específicos para encontrar utilidades de los mapas.

## Funcionalidades

- Comando para buscar videos de YouTube sobre Counter-Strike 2.
- Autocompletar para seleccionar mapas y zonas dentro de los mapas.
- Respuestas personalizadas basadas en los comandos de los usuarios.

## Requisitos

- [Node.js](https://nodejs.org/) v16.6.0 o superior.
- [Discord.js](https://discord.js.org/) v14 o superior.
- Una cuenta de Discord y un bot configurado.
- [YouTube Data API v3](https://developers.google.com/youtube/v3) para realizar búsquedas en YouTube.
- Variables de entorno configuradas para las credenciales del bot y la API de YouTube.

## Instalación

1. Clonar este repositorio:

    ```bash
    git clone https://github.com/MarceloVasquez662/utility_bot
    ```

2. Navegar a la carpeta del proyecto:

    ```bash
    cd utility_bot
    ```

3. Instalar las dependencias:

    ```bash
    npm install
    ```

4. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```bash
    TOKEN = el_token_de_tu_bot
    APP_ID = el_app_id_de_tu_bot_de_discord
    PORT = 3000 (o el que decidas)
    AUTOHOST = el_host_de_tu_app_para_que_no_se_baje_por_inactividad
    AUTORELOAD_INTERVAL = 60000 (o el tiempo que decidas para que haga llamados y no se baje por inactividad)
    GOOGLE_API_KEY = api_key_de_google_para_youtube_api
    SMOKES_PLAYLIST_KEY = id_de_la_playlist_de_los_smokes
    ```

5. Ejecutar el bot:

    ```bash
    node index.js
    ```

## Uso

El bot permite a los usuarios buscar videos relacionados con Counter-Strike 2 mediante comandos.

### Comandos principales:

- `/smoke [mapa] [zona]`: Busca videos en YouTube sobre cómo lanzar granadas de humo en la zona seleccionada del mapa indicado.
  - **Ejemplo**: `/smoke Dust2 medio` enviará un video de YouTube con tutoriales de cómo lanzar granadas de humo en la zona "medio" del mapa Dust2.

### Personalización del autocompletar

El bot soporta autocompletado dinámico de zonas basado en el mapa seleccionado. Esto permite una interacción más rápida y precisa.

## Despliegue

### En Render

1. Conectar el repositorio a tu cuenta de [Render](https://render.com/).
2. Configurar las variables de entorno como se describe arriba en las configuraciones de la aplicación de Render.
3. Configurar el start command en Render: `node index.js`.
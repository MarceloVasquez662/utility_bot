import express from "express"

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot de Discord está corriendo!');
  });
  
app.listen(port, () => {
    console.log(`Bot de Discord está corriendo en el puerto ${port}`);
});
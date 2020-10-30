const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4001;

const fs = require('fs');

function res_filmes(){
  let filmes = "./filmes";
  let dir_filmes = fs.readdirSync(filmes);
  let filmes_list = {filmes:[]};
  
  dir_filmes.forEach((file) => {
    filmes_list.filmes.push(
      {
        titulo : file
      }
    );
  });
  
  return filmes_list;
}

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/filmes', (req, res) => {
    res.send(res_filmes())
});

app.get('/filmes/:titulo', (req, res) => {
  const { titulo } = req.params;
  const arquivo = `./filmes/${titulo}`;
  fs.stat(arquivo, (err, stats) => {
    if (err) {
      console.log(err);
      return res.status(404).end('<h1>Arquivo não encontrado!</h1>');
    }
    // Variáveis necessárias para montar o chunk header corretamente
    const { range } = req.headers;
    const { size } = stats;
    const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
    const end = size - 1;
    const chunkSize = (end - start) + 1;
    // Definindo headers de chunk
    res.set({
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4'
    });
    // É importante usar status 206 - Partial Content para o streaming funcionar
    res.status(206);
    // Utilizando ReadStream do Node.js
    // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
    const stream = fs.createReadStream(movieFile, { start, end });
    stream.on('open', () => stream.pipe(res));
    stream.on('error', (streamErr) => res.end(streamErr));
  });
});

app.listen(port, () => console.log(`Server on - ${port}`));
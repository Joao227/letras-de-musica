# letras-de-musica
Uma biblioteca que realiza requisições ao site letras.mus.br e retorna informações detalhadas, como o nome do artista, o título da música e a letra completa da canção.

## instalação  

```
npm i letras-de-musica
```

## Uso

```js
const { searchLyrics } = require("letras-de-musica");

searchLyrics('Leans pt 2').then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});
```

> A função `searchLyrics()` é assíncrona e retorna uma Promise.

## Exemplo de resposta
Caso alguma música seja encontrada, um objeto JSON é retornado com a resposta

```json
{
  "artist:": "Yunk Vino",
  "title": "Leans, Pt. 2",
  "lyrics": 
   "Baby olha essas notas, tudo em cima de mim\n
    Essas drogas em cima de mim\n
    Essas vadias rodeiam o camarim\n
    Baby eu só consigo dormir com lean\n"
}
```

Desenvolvido por [ScriptSantos](https://github.com/Joao227).
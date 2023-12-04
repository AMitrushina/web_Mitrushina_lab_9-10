const http = require("http");
const fs = require("fs");
 
http.createServer(async (request, response) => {
      
    if(request.url == "/server"){
         
          const buffers = [];
          for await (const chunk of request) {
            buffers.push(chunk);
          }
         
        const data = Buffer.concat(buffers).toString();
        const json = JSON.parse(data); // парсим строку в json
        console.log(data);
        response.end("Данные пришли");
    }
    if (request.url == "/style.css") { 
        fs.readFile("style.css", (error, data) => {
            response.write(data);
            response.end()})
    }
    if (request.url == "/script.js") { 
        fs.readFile("script.js", (error, data) => {
            response.write(data);
            response.end()})
    }
    else{
        fs.readFile("index.html", (error, data) => {
            response.write(data);
            response.end()})
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));
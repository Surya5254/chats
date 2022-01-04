const fs = require('fs');
const http = require('http');

const server = http.createServer((req,res) => {
    console.log('request has made');
    res.setHeader('Content-Type','text/html');
    fs.readFile('./index.html',(err,data) => {
        if(err)
        {
            console.log(err);
            res.end();
        } else{
            res.write(data);
            res.end();
        }
    })
});
server.listen(3000,'localhost',() => {
    console.log('banda ku');
});
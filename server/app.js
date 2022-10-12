const fs = require('fs');
const path = require('path');
const url = require('url');
const rootDir = path.resolve(__dirname, '../..');
const serverRootDir = path.resolve(__dirname, '.');
const env = require('dotenv').config( { path: `${rootDir}/.env` } ).parsed;
const http = require('http');

if(!env) {
  throw new Error('Environment variables not found');
}

const server_port = env['PORT'] || 5000;
console.log(`Server configured for port ${server_port}`); // if .env file loaded properly, this should print 3000, else it will print 5000

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  //console.log(parsedUrl);
  // routing logic goes here

  // redirect to public folder if GET for image
  if(req.url.match("\.png$")){
    const imagePath = path.join(__dirname, 'public', req.url);
    const fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, {"Content-Type": "image/png"});
    fileStream.pipe(res);
  }
  // GET('/api/*) => apiRouter with client wildcard route (use regex to match indeterminate number of path segments)
  else if(req.url.match(/\/api\/.+/) && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Hello Client! Your request was for ${req.url.substring('/api/'.length)}` }));
  }
  // GET('/api') => apiRouter default route
  else if(req.url === '/api' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello World' }));
  }
  // GET('/') => default route
  else if(req.url == '/') {// default route goes at the end so it doesn't override other routes
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const pageNotFoundPage = fs.readFileSync(`${serverRootDir}/404.html`);
    res.write(pageNotFoundPage);
    res.end();
  }
  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
});

server.listen(server_port, (error) => {
  if(error) {
    console.log('Error starting server', error);
    return;
  }
  console.log(`Server running at port ${server_port}`);
});

// close server after 10 seconds if no connections
setTimeout(() => {
  console.log('Server closing');
  server.close();
}, 10000);
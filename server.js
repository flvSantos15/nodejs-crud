const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})

}).listen(4001, () => {
  console.log('Servidor rodando na porta 4001')
})